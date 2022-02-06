const required = (req, res, next) => {
  if(!req.body.clientId) {
    return res.status(400).send("clientId is required")
  }
  if(!req.body.job) {
    return res.status(400).send("Job is required")
  }
  if(!req.body.description) {
    return res.status(400).send("Description is required")
  }
  next()
}

module.exports={
  required,
}