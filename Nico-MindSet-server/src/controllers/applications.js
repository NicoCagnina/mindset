const Applications = require('../models/Applications')

const getApplications = (req, res) => {
  Applications.find().populate('positions').populate('postulants').populate('client')
    .then ((applications) => {
      return res.status(200).json(applications)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}

const getApplicationById = (req, res) => {
  Applications.findById (req.params._id).populate('positions').populate('postulants').populate('client')
    .then ((applications) => {
      return res.status(200).json(applications)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}

const createApplication = (req, res) => {
  const newApplication = new Applications({
    positions: req.body.positions,
    postulants: req.body.postulants,
    client: req.body.client,
    result: req.body.result,
  })
  newApplication.save((error, application) => {
    if (error) {
      return res.status(400).json(error)
    }
    return res.status(201).json(application)
  })
};

const updateApplication = (req, res) => {
  Applications.findByIdAndUpdate(req.params._id,
    req.body,
    { new: true },
    (error, updatedApplication) => {
      if (!updatedApplication) {
        return res.status(404).json({
          msg: `Application with id: ${req.params._id} was not found`
        })
      }
      if (error) {
        return res.status(400).json(error)
      }
      return res.status(200).json(updatedApplication)
    }
  )
};

const deleteApplication = (req, res) => {
  Applications.findByIdAndDelete({ _id: req.params._id })
    .then ((applications) => {
      return res.status(200).json(applications)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication
}
