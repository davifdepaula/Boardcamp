import db from "../config/database.js"
import dayjs from "dayjs"

const getRentals = async(req, res) => {
  try{
    const rentals = (await db.query('SELECT * FROM rentals')).rows
    return res.send(rentals)
  }
  catch(error){
    return res.status(500).send(error.message)
  }
}

const postRentals = async(req, res) => {
  const { customerId, gameId, daysRented } = req.body
  const delayFee = null, returnDate = null
  const rentDate = dayjs(Date.now()).format('YYYY-MM-DD')
  try{
    let pricePerDay = (await db.query('SELECT "pricePerDay" FROM games where id = $1', [gameId]))
    pricePerDay = pricePerDay.rows[0].pricePerDay

    const originalPrice = daysRented*(pricePerDay)

    await db.query(`INSERT INTO rentals 
    ("customerId", "gameId", "daysRented", 
    "rentDate","returnDate", "originalPrice", 
    "delayFee")
    values
    (${customerId}, ${gameId}, ${daysRented}, 
    '${rentDate}', ${returnDate}, ${originalPrice}, 
    ${delayFee})
    `)

    let stockTotal = await db.query('SELECT "stockTotal" FROM games where id=$1', [gameId])
    stockTotal = stockTotal.rows[0].stockTotal
    stockTotal -= 1
    await db.query('UPDATE games SET "stockTotal" = $1 WHERE id = $2', [stockTotal, gameId])
    
    return res.sendStatus(201)
  }catch(error){
    return res.status(500).send(error.message)

  }
}

export {
  getRentals, 
  postRentals
}
