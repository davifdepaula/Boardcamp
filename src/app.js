import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import gamesRoutes from './routes/GamesRoutes.js'


dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()
app.use(express.json())
app.use(cors())
app.use(gamesRoutes)


app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})