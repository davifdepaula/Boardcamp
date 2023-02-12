import db from "../config/database.js";

const getGames = async(req, res) => {
  try{
    let games
    const {name} = req.query
    const nameCapitalize = name[0].toUpperCase() + name.substring(1) 
    if(name) {
      games = (await db.query(`SELECT * FROM games 
        WHERE name LIKE '${nameCapitalize}%'`)).rows
  }else{
      games = (await db.query("SELECT * FROM games")).rows
  }
    res.send(games)
  }catch(error){
    res.status(500).send(error.message)
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