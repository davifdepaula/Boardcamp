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
    if(game.rows[0].stockTotal > 0) next()
    else return res.sendStatus(400)
  }catch(error){
    return res.status(500).send(error.message)
  }
}

export{
  rentalsValidation
}