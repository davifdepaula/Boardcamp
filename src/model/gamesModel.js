import joi from 'joi'

const gamesSchema = joi.object({
  name: joi.string().required(),
  image: joi.string(),
  stockTotal: joi.number().greater(0).required(),
  pricePerDay: joi.number().greater(0).required()
})


export {
  gamesSchema
}