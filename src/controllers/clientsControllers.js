import db from "../config/database.js"

const getClients = async(req, res) => {
  try {
    const clients = (await db.query("SELECT * FROM customers")).rows
    return res.send(clients)
  } catch (error) {
    res.status(500).send(error.message)    
  }
}

const getClientsById = async(req, res) => {
  const {id} = req.params
  try {
    const clients = (await db.query(`SELECT * FROM customers where id = $1`, [id]))
    if(clients.rows.length > 0) return res.send(clients.rows[0])
    else return res.sendStatus(404)
    return res.send(clients)
  } catch (error) {
    res.status(500).send(error.message)    
  }
}

const postClients = async(req, res) => {
const { name, phone, cpf, birthday } = req.body
try{
  const customers = await db.query(
    `INSERT INTO customers 
    (name, phone, "cpf", "birthday") 
    VALUES 
    ('${ name }', '${ phone }', '${ cpf }', '${ birthday }')`)
  res.sendStatus(201) 
}
catch(error){
  res.status(500).send(error.message)
}
}

const putClient = async(req, res) => {
  const { name, phone, cpf, birthday } = req.body
  const { id } = req.params
  try{
    const customers = await db.query(
      `UPDATE customers
      SET name = '${ name }', 
      phone = '${ phone }', 
      cpf = '${ cpf }', 
      birthday = '${ birthday }'
      WHERE id = $1`, [id])
    res.send() 
  }
  catch(error){
    res.status(500).send(error.message)
  }
  }


export {
  getClients,
  getClientsById,
  postClients,
  putClient
}