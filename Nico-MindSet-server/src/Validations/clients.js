const exEmail=/\w+@+\w/;

const required = (req, res, next) => {
  if(!req.body.customerName) {
    return res.status(400).send("Customer name is required")
  }
  if(!req.body.branch) {
    return res.status(400).send("Branch is required")
  }
  if(!req.body.phone) {
    return res.status(400).send("Phone is required")
  }
  if(!req.body.email) {
    return res.status(400).send("Email is required")
  }
  else{
    const email=exEmail.test(req.body.email)
    if (!email){
      return res.status(400).send("The email must have @")
    }
  }
  if(!req.body.description) {
    return res.status(400).send("Description is required")
  }
  next()
}

module.exports={
  required,
}