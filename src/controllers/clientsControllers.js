import db from "../config/database.js"

const getClients = async(req, res) => {
  try {
    
  } catch (error) {
    res.status(500).send(error.message)
    
  }{
    
  }
  const clients = await db.query("SELECT * FROM clientes").rows

}