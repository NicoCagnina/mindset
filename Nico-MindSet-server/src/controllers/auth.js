const Postulants = require('../models/Postulants');
const Psychologists = require('../models/Psychologists');
const Admins = require('../models/Admins');
const Firebase = require('../helper/firebase');

const postulant = 'postulant';
const psychologist = 'psychologist';
const admin = 'admin';

const registerPostulant = async (req, res) => {
  let savedNewPostulant;
  try {
    const { email, password, userName: displayName } = req.body;
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
      profiles: req.body.profiles,
      experience: req.body.experience,
      studies: req.body.studies,
    });
    savedNewPostulant = await newPostulant.save();

    const newFirebaseUser = await Firebase.auth().createUser({
      displayName,
      email,
      password,
    });
    const firebaseUID = newFirebaseUser.uid;
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, {
      role: postulant,
      mongoDBID: savedNewPostulant._id,
    });

    Postulants.findByIdAndUpdate(
      savedNewPostulant._id,
      { firebaseUID },
      { new: true },
      (error, updatedPostulant) => {
        if (!updatedPostulant) {
          throw new Error(`Postulant with id: ${req.params.id} was not found`);
        }
        if (error) {
          throw new Error(error);
        }
      }
    );

    return res.status(201).json({
      message: 'User created',
      data: { firebaseUID, mongoDBID: savedNewPostulant._id, role: postulant },
    });
  } catch (error) {
    Postulants.findOneAndRemove(
      { _id: savedNewPostulant?._id },
      { useFindAndModify: false },
      () => res.status(400).json({ message: error.toString() })
    );
  }
};

const registerPsychologist = async (req, res) => {
  let savedNewPsychologist;
  try {
    const { email, password, userName: displayName } = req.body;
    const newPsychologist = new Psychologists({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    savedNewPsychologist = await newPsychologist.save();

    const newFirebaseUser = await Firebase.auth().createUser({
      displayName,
      email,
      password,
    });
    const firebaseUID = newFirebaseUser.uid;
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, {
      role: psychologist,
      mongoDBID: savedNewPsychologist._id,
    });

    Psychologists.findByIdAndUpdate(
      savedNewPsychologist._id,
      { firebaseUID },
      { new: true },
      (error, updatedPsychologist) => {
        if (!updatedPsychologist) {
          throw new Error(
            `Psychologist with id: ${req.params.id} was not found`
          );
        }
        if (error) {
          throw new Error(error);
        }
      }
    );

    return res.status(201).json({
      message: 'User created',
      data: {
        firebaseUID,
        mongoDBID: savedNewPsychologist._id,
        role: psychologist,
      },
    });
  } catch (error) {
    Psychologists.findOneAndRemove(
      { _id: savedNewPsychologist?._id },
      { useFindAndModify: false },
      () => res.status(400).json({ message: error.toString() })
    );
  }
};

const registerAdmin = async (req, res) => {
  let savedNewAdmin;
  try {
    const { email, password, userName: displayName } = req.body;
    const newAdmin = new Admins({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    savedNewAdmin = await newAdmin.save();

    const newFirebaseUser = await Firebase.auth().createUser({
      displayName,
      email,
      password,
    });
    const firebaseUID = newFirebaseUser.uid;
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, {
      role: admin,
      mongoDBID: savedNewAdmin._id,
    });

    Admins.findByIdAndUpdate(
      savedNewAdmin._id,
      { firebaseUID },
      { new: true },
      (error, updatedAdmin) => {
        if (!updatedAdmin) {
          throw new Error(`Admin with id: ${req.params.id} was not found`);
        }
        if (error) {
          throw new Error(error);
        }
      }
    );

    return res.status(201).json({
      message: 'User created',
      data: { firebaseUID, mongoDBID: savedNewAdmin._id, role: admin },
    });
  } catch (error) {
    Admins.findOneAndRemove(
      { _id: savedNewAdmin?._id },
      { useFindAndModify: false },
      () => res.status(400).json({ message: error.toString() })
    );
  }
};

module.exports = {
  registerPostulant,
  registerPsychologist,
  registerAdmin,
};
