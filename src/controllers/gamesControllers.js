import db from "../config/database.js";

const getGames = async(req, res) => {
  try{
    const games = await db.query("SELECT * FROM games;")
    res.send(games.rows)
  }catch{
    res.sendStatus(500)
  }
}

const postGames = async(req, res) => {
  const { name, image, stockTotal, pricePerDay } = req.body
  try{
    const games = await db.query(
      `INSERT INTO games 
      (name, image, "stockTotal", "pricePerDay") 
      VALUES 
      ('${ name }', '${ image }', ${ stockTotal }, ${ pricePerDay })`)
    res.sendStatus(201) 
  }
  catch(error){
    res.status(500).send(error.message)
  }
}

export {
  getGames,
  postGames
}