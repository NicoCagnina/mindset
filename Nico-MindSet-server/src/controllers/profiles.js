const Profiles = require('../models/Profiles')

const getProfiles = (req, res) => {
  Profiles.find()
    .then((result) => {
      return res.status(200).json(result)     
    })
    .catch((error) => {
      return res.status(400).json(error)  
    })
}
const getOneProfile = (req, res) => {
  Profiles.find({_id: req.params.id})
    .then((result) => {
      return res.status(200).json(result)
    }) 
    .catch((error) => {
      return res.status(404).json({
        msg: `No profile with the Id of ${req.params.id}` 
        })
    })
}

const createProfile = (req, res) => {
  const newProfile = new Profiles ({
    profileName: req.body.profileName,
    branch: req.body.branch,
    description: req.body.description
  })
  newProfile.save((error, profile) => {
    if (error) {
      return res.status(400).json(error)
    }
      return res.status(201).json(profile)
  })
}

const editProfile = (req, res) => {
  Profiles.findByIdAndUpdate(req.params.id,
    {profileName: req.body.profileName,
    branch: req.body.branch,
    description: req.body.description},
    {new : true}
  ) 
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg:`Profile with id: ${req.params.id} was not found`
        })
      }
      return res.status(200).json(result)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}

const deleteProfile = (req, res) => { 
  Profiles.findByIdAndDelete(req.params.id)
    .then((result) => {
      if(!result) {
        return res.status(404).json({
          msg: `Profile with id: ${req.params.id} was not found`
        })
      }
      return res.status(200).json(result)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}

module.exports = {
	getProfiles,
  getOneProfile,
  createProfile,
  deleteProfile,
  editProfile
}
