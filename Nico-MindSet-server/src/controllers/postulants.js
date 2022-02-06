const Postulants = require('../models/Postulants');
const firebase = require('../helper/firebase');

const getPostulants = (req, res) => {
  Postulants.find({})
    .populate('profiles.profile')
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        msg:
          err.message || 'There was an error while retrieving the postulants',
      });
    });
};

const getOnePostulant = (req, res) => {
  Postulants.findById(req.params.id, (error, postulant) => {
    if (!postulant) {
      return res.status(404).json({
        msg: `Postulant with id: ${req.params.id} was not found`,
      });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(postulant);
  }).populate('profiles.profile');
};

const createPostulant = (req, res) => {
  const newPostulant = new Postulants({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    birthDate: req.body.birthDate,
    street: req.body.street,
    streetNumber: req.body.streetNumber,
    city: req.body.city,
    postalCode: req.body.postalCode,
    province: req.body.province,
    country: req.body.country,
    telephone: req.body.telephone,
    contactRange: req.body.contactRange,
    availability: req.body.availability,
    studies: req.body.studies,
    experience: req.body.experience,
    profiles: req.body.profiles,
  });
  newPostulant.save((error, postulant) => {
    if (error) {
      return res.status(400).json(error);
    } else {
      return res.status(201).json(postulant);
    }
  });
};

const editPostulants = (req, res) => {
  Postulants.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      birthDate: req.body.birthDate,
      street: req.body.street,
      streetNumber: req.body.streetNumber,
      city: req.body.city,
      postalCode: req.body.postalCode,
      province: req.body.province,
      country: req.body.country,
      telephone: req.body.telephone,
      contactRange: req.body.contactRange,
      availability: req.body.availability,
      'studies.primaryStudies': req.body.studies?.primaryStudies,
      'studies.secondaryStudies': req.body.studies?.secondaryStudies,
      'studies.tertiaryStudies': req.body.studies?.tertiaryStudies,
      'studies.universityStudies': req.body.studies?.universityStudies,
      'studies.informalStudies': req.body.studies?.informalStudies,
      experience: req.body.experience,
      profiles: req.body.profiles,
    },
    { new: true },
    (error, updatedPostulant) => {
      if (!updatedPostulant) {
        return res
          .status(404)
          .json({ msg: `Postulant with id: ${req.params.id} was not found` });
      }
      if (error) {
        return res.status(400).json(error);
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
    }
  );
};

const deletePostulants = (req, res) => {
  Postulants.findOneAndRemove(
    { _id: req.params.id },
    { useFindAndModify: false },
    (error, DeletedPostulant) => {
      if (!DeletedPostulant) {
        return res
          .status(404)
          .json({ msg: `Postulant with id: ${req.params.id} was not found` });
      }
      if (error) {
        return res.status(400).json(error);
      }
      firebase
        .auth()
        .deleteUser(DeletedPostulant.firebaseUID)
        .then(() => {
          return res.status(200).send({
            msg: `Postulant ${req.params.id} was deleted successfully`,
          });
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    }
  );
};

module.exports = {
  getPostulants,
  getOnePostulant,
  createPostulant,
  editPostulants,
  deletePostulants,
};
