import db from "../config/database.js";

const getGames = async(req, res) => {
  try{
    let games
    let {name, limit, offset, order, desc} = req.query
    if(!offset) offset = null
    if(!limit) limit = null 
    if(!order) order = 'id'
    if(!desc) desc = 'asc' 
    else desc = 'desc' 
    if(name) {
      const nameCapitalize = name[0].toUpperCase() + name.substring(1) 
      games = (await db.query(`SELECT * FROM games 
        WHERE name LIKE '${nameCapitalize}%' 
        ORDER BY "${order}" desc limit ${limit} offset ${offset}`)).rows
  }else{
      games = (await db.query(`SELECT * FROM games 
      ORDER BY "${order}" ${desc} limit ${limit} offset ${offset}`)).rows
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