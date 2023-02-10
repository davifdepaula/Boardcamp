import express from 'express'
import { getClients, getClientsById, postClients, putClient } from '../controllers/clientsControllers.js'
import { clientsValidation } from '../middleware/clientsValidation.js'

const clientsRoutes = express.Router()
clientsRoutes.get('/customers', getClients)
clientsRoutes.get('/customers/:id', getClientsById)
clientsRoutes.post('/customers', clientsValidation, postClients)
clientsRoutes.put('/customers/:id', clientsValidation, putClient)

export default clientsRoutes