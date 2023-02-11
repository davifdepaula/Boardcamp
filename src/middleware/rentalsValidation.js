import db from "../config/database.js"
import { rentalSchema } from "../model/rentalsModel.js"

const rentalsValidation = async(req, res, next) => {
  try{
    const validation = rentalSchema.validate(req.body)
    if(validation.error) return res.sendStatus(400)
    const client = await db.query(`SELECT * FROM customers 
    where id = $1`, [req.body.costumerId])
    if(!client) return res.sendStatus(400)
    const game = await db.query(`SELECT * FROM games 
    where id = $1`, [req.body.gameId])
    if(!game) return res.sendStatus(400)
    if(game.rows[0].stockTotal === 0) return res.sendStatus(400)
    next()
  }catch(error){
    return res.status(500).send(error.message)
  }
}

export{
  rentalsValidation
}