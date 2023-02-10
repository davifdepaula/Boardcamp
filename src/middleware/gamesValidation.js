import db from "../config/database.js"
import { gamesSchema } from "../model/gamesModel.js"

const gamesValidation = async(req, res, next) => {
  try{
    const validation = gamesSchema.validate(req.body)
    if(validation.error) return res.sendStatus(400)
    const games = await db.query(`SELECT * FROM games where name = '${req.body.name}'` )
    console.log(games)
    if(games.rows.length > 0) return res.sendStatus(409)
    next()
  }
  catch(error){
    res.status(500).send(error.message)
  }
}

export {
  gamesValidation
}