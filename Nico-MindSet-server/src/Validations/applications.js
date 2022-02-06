const fs = require('fs')

const validateApplicationCreation = (req, res, next) => {
  if (!req.body?.postulants && !req.body?.positions && !req.body?.client) {
    return res.status(400).send({ msg: 'postulant, position and client are empty' })
  }
  if (!req.body?.postulants) {
    return res.status(400).send({ msg: 'postulant is empty' })
  }
  if (!req.body?.positions) {
    return res.status(400).send({ msg: 'position is empty' })
  }
  if (!req.body?.client) {
    return res.status(400).send({ msg: 'client is empty' })
  }
  next()
}

module.exports = {
  validateApplicationCreation
}