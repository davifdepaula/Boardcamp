import express from 'express'
import { getRentals, postRentals } from '../controllers/rentalsControllers.js'
import { checkRentals, rentalsValidation } from '../middleware/rentalsValidation.js'

const rentalsRoutes = express.Router()

rentalsRoutes.get('/rentals', getRentals)
rentalsRoutes.post('/rentals', rentalsValidation, checkRentals, postRentals)


export default rentalsRoutes