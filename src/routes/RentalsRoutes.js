import express from 'express'
import { getRentals, postRentals } from '../controllers/rentalsControllers.js'
import { rentalsValidation } from '../middleware/rentalsValidation.js'

const rentalsRoutes = express.Router()

rentalsRoutes.get('/rentals', getRentals)
rentalsRoutes.post('/rentals', rentalsValidation, postRentals)


export default rentalsRoutes