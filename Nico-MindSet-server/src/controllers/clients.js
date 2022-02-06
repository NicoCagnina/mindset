const Clients = require('../models/Clients');

const getClients = (req, res) => {
  Clients.find()
   .then((Clients)=>{
    res.status(200).json(Clients)
   })
   .catch((error)=>{
    res.status(400).json(error)
   })
}

const getOneClient = (req, res) => {
  Clients.findById(req.params.id,
  (error,Clients) => {
    if(!Clients) {
      return res.status(404).json({
        msg: `Client with id: ${req.params.id} was not found`
      })
    }
    if(error) {
      return res.status(400).json(error)
    }
    return res.status(200).json(Clients)
  })
}

const updateClient = (req, res) => {
  Clients.findByIdAndUpdate(req.params.id,
    { 
      customerName: req.body.customerName,
      branch: req.body.branch,
      phone: req.body.phone,
      email:req.body.email,
      description:req.body.description
    },
    { new: true }, 
    (error, newClient) => {
      if(!newClient) {
        return res.status(404).json({
          msg: `Client with id: ${req.params.id} was not found`
        })
      }
      if(error) {
        return res.status(400).json(error)
      }
      return res.status(200).json(newClient)
    }
  )
}

const createClient=(req, res) => {
  const client = new Clients({
    customerName: req.body.customerName,
    branch: req.body.branch,
    phone: req.body.phone,
    email: req.body.email,
    description: req.body.description
  })

  client.save((error, client) => {
    if(error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(client)
  })
}

const deleteClient=(req,res)=>{
  Clients.findByIdAndRemove(req.params.id,
  (error,Clients) => {
    if(!Clients) {
      return res.status(404).json({
        msg: `Client with id: ${req.params.id} was not found`
      })
    }
    if(error) {
      return res.status(400).json(error)
    }
    return res.status(200).json(Clients)
  })
}

module.exports = {
  getClients,
  getOneClient,
  createClient,
  updateClient,
  deleteClient
}
