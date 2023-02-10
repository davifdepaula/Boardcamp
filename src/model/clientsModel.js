import joi from 'joi'
import joiDate from "@joi/date";
joi.extend(joiDate)
const clientsSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11),
  cpf: joi.string().length(11).required(),
  birthday: joi.date().required()
})

export {
  clientsSchema
}