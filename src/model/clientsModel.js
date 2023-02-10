import joi from 'joi'

const clientsSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11),
  cpf: joi.string().regex(/^\d+$/).length(11).required(),
  birthday: joi.date().required()
})

export {
  clientsSchema
}