import express from 'express'
import { deleteRentals, getRentals, postFinalizeRent, postRentals } from '../controllers/rentalsControllers.js'
import { checkFinalizeRental, checkIsItWasReturned, checkRentals, deleteValidation, rentalsValidation } from '../middleware/rentalsValidation.js'

const rentalsRoutes = express.Router()

rentalsRoutes.get('/rentals', getRentals)
rentalsRoutes.post('/rentals', rentalsValidation, checkRentals, postRentals)
rentalsRoutes.post('/rentals/:id/return', checkFinalizeRental, checkIsItWasReturned, postFinalizeRent)
rentalsRoutes.delete('/rentals/:id', deleteValidation, deleteRentals)


export default rentalsRoutes