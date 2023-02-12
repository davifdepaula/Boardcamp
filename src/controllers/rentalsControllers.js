import db from "../config/database.js"
import dayjs from "dayjs"

const getRentals = async(req, res) => {
  try{
    const rentals = (await db.query(`SELECT "rentals".*, 
    "customers".id as "customersId", "customers"."name" as "customersName", 
    "games".id as "gameIdfromTableId", "games"."name" as "gameName"
    FROM rentals join  customers
      on "customerId" = "customers".id
    join games 
      on      
    "gameId" = "games".id
    `)).rows
    const rentalsCustomersGames = rentals.map(item => {
        return { id: item.id, customerId: item.customerId, gameId: item.gameId,
          rentDate: item.rentDate, daysRented: item.daysRented, returnDate: item.returnDate,
          originalPrice: item.originalPrice, delayFee: item.delayFee, 
          customer: { id: item.customerId, name: item.customersName },
          game: { id: item.gameId, name: item.gameName }}
    })
    return res.send(rentalsCustomersGames)
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
    valuess
    (${customerId}, ${gameId}, ${daysRented}, 
    '${rentDate}', ${returnDate}, ${originalPrice}, 
    ${delayFee})
    `)   
    return res.sendStatus(201)
  }catch(error){
    return res.status(500).send(error.message)

  }
}

const postFinalizeRent = async(req, res) => {
  const {id} = req.params
  try {
    const rentalGame = (await db.query(`SELECT * FROM 
      rentals WHERE id = ${id}`)).rows[0]

    let pricePerDay = (await db.query(`SELECT * FROM 
      games WHERE id = ${id}`)).rows[0]

    pricePerDay = pricePerDay.pricePerDay
    const returnDate = dayjs(Date.now()).format('YYYY-MM-DD')
    const returnDay = returnDate.toString().slice(8,10)
    const rentDay = rentalGame.rentDate.toString().slice(8,10)
    let delayFee = Number(returnDay) - Number(rentDay)

    if (delayFee > rentalGame.daysRented) delayFee = delayFee - rentalGame.daysRented
    else delayFee = 0
    delayFee = delayFee*pricePerDay

    await db.query(`UPDATE rentals 
    SET "returnDate" = '${returnDate}', "delayFee" = ${delayFee}`)

    res.sendStatus(200)    
  } catch (error) {
    return res.status(500).send(error.message)
    
  }
}

export {
  getRentals, 
  postRentals,
  postFinalizeRent
}
