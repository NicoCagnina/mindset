const Psychologists = require('../models/Psychologists');
const firebase = require('../helper/firebase');

const getPsychologists = (req, res) => {
  Psychologists.find()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const getOnePsychologist = (req, res) => {
  Psychologists.findById(req.params.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(404).json({
        msg: `No psychologist with the Id of ${req.params.id}`,
      });
    });
};

const createPsychologist = (req, res) => {
  const psychologist = new Psychologists({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  psychologist.save((error, psychologist) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(psychologist);
  });
};

const editPsychologist = (req, res) => {
  Psychologists.findOneAndUpdate(
    { _id: req.params.id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Psychologist with id: ${req.params.id} was not found`,
        });
      }
      firebase
        .auth()
        .updateUser(updatedPostulant.firebaseUID, {
          email: req.body.email,
          password: req.body.password,
          displayName: req.body.userName,
        })
        .then(() => res.status(200).json(updatedPostulant))
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const deletePsychologist = (req, res) => {
  Psychologists.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Psychologist with id: ${req.params.id} was not found`,
        });
      }
      firebase
        .auth()
        .deleteUser(result.firebaseUID)
        .then(() => {
          return res.status(200).send({
            msg: `Psychologist ${req.params.id} was deleted successfully`,
          });
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

module.exports = {
  getPsychologists,
  getOnePsychologist,
  editPsychologist,
  createPsychologist,
  deletePsychologist,
};
