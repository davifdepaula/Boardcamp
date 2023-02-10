import db from "../config/database.js"
import { gamesSchema } from "../model/gamesModel.js"

const gamesValidation = async(req, res, next) => {
  try{
    const validation = gamesSchema.validate(req.body)
    if(validation.error) return res.sendStatus(400)
    const games = (await db.query('SELECT * FROM games')).rows
    if(games.includes(req.body.name)) return res.sendStatus(409)
    next()
  }
  catch(error){
    res.status(500).send(error.message)
  }
}

export {
  gamesValidation
}