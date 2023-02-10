import db from "../config/database.js"
import { clientsSchema } from "../model/clientsModel.js"

const clientsValidation = async(req, res, next) => {
  try{
    const validation = clientsSchema.validate(req.body)
    if(validation.error) return res.sendStatus(400)
    const clients = await db.query(`SELECT * FROM customers where name = '${req.body.name}'` )
    if(clients.rows.length > 0) return res.sendStatus(409)
    next()
  }
  catch(error){
    res.status(500).send(error.message)
  }
}

export {
  clientsValidation
}