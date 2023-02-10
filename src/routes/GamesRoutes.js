import express from 'express'
import { getGames, postGames } from '../controllers/gamesControllers.js'
import { gamesValidation } from '../middleware/gamesValidation.js'

const gamesRoutes = express.Router()

gamesRoutes.get('/games', getGames)
gamesRoutes.post('/games', gamesValidation, postGames)

export default gamesRoutes