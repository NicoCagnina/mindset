const createPsychologistValidation = (req, res, next) => {
  if (Object.keys(req.body).length === 0){
    return res.status(400).send({
      msg: 'All fields are missing'
    })
  }
  if (!req.body?.firstName){
    return res.status(400).send({
      msg: 'The first name is missing'
    })
  }
  else if (!req.body?.lastName){
    return res.status(400).send({
      msg: 'The last name is missing'
    })
  }
  else if (!req.body?.userName){
    return res.status(400).send({
      msg: 'The user name is missing'
    })
  }
  else if (!req.body?.email){
    return res.status(400).send({
      msg: 'The email is missing'
    })
  }
  else if (!req.body?.password){
    return res.status(400).send({
      msg: 'The password is missing'
    })
  }
  next()
}

const editPsychologistValidation = (req, res, next) => {
  if (Object.keys(req.body).length === 0){
    return res.status(400).send({
      msg: 'Data to update cannot be empty'
    })
  }
  next()
}  

module.exports = {
  createPsychologistValidation,
  editPsychologistValidation
}
