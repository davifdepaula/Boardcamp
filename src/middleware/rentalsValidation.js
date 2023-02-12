import db from "../config/database.js"
import { rentalSchema } from "../model/rentalsModel.js"

const rentalsValidation = async(req, res, next) => {
  try{
    const validation = rentalSchema.validate(req.body)
    if(validation.error) return res.sendStatus(400)
    const client = await db.query(`SELECT * FROM customers 
    where id = $1`, [req.body.customerId])
    if(!client) return res.sendStatus(400)
    const game = await db.query(`SELECT * FROM games 
    where id = $1`, [req.body.gameId])
    if(!game) return res.sendStatus(400)
    next()
  }catch(error){
    return res.status(500).send(error.message)
  }
}

const checkRentals = async(req, res, next) => {
  try {
    const rentalsQuantity = (await db.query(`SELECT * FROM rentals
    WHERE id = ${req.body.gameId}`)).rows.length
    const stockTotal = (await db.query(`SELECT * FROM games
    WHERE id = ${req.body.gameId}`)).rows[0].stockTotal
    if(rentalsQuantity >= stockTotal || stockTotal === 0) return res.sendStatus(400)
    next()    
  } catch (error) {
    return res.status(500).send(error.message)    
  }
}

const checkFinalizeRental = async(req, res, next) => {
  try {
    const game =  (await db.query(`SELECT * FROM rentals
    WHERE id = ${req.params.id}`)).rows
    if(game.length === 0) return res.sendStatus(404)
    next()
  } catch (error) {
    return res.status(500).send(error.message)
    
  }
}
const checkIsItWasReturned = async(req, res, next)=>{
  try {
    const returnDate =  (await db.query(`SELECT * FROM rentals
    WHERE id = ${req.params.id}`)).rows[0].returnDate
    if(returnDate) return res.sendStatus(400)
    next()
  } catch (error) {
    return res.status(500).send(error.message)    
  }
}
const deleteValidation = async(req, res, next) => {
  try{
    const rental = (await db.query(`SELECT * FROM rentals
    WHERE id = ${req.params.id}`)).rows[0]
    if(!rental) return res.sendStatus(404)
    if(!rental.returnDate) return res.sendStatus(400)
    next()
  }catch(error){
    return res.status(500).send(error.message)
  }
}
export{
  rentalsValidation,
  checkRentals,
  checkFinalizeRental,
  checkIsItWasReturned,
  deleteValidation
}