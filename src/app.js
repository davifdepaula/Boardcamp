import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import gamesRoutes from './routes/GamesRoutes.js'
import clientsRoutes from './routes/ClientsRoutes.js'
import rentalsRoutes from './routes/RentalsRoutes.js'


dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())
app.use(gamesRoutes)
app.use(clientsRoutes)
app.use(rentalsRoutes)


app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})