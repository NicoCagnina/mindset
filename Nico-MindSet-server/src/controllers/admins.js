const Admin = require('../models/Admins');
const firebase = require('../helper/firebase');

const createAdmin = (req, res) => {
  const admin = new Admin({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  admin.save((error, admin) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(admin);
  });
};

const findAllAdmins = (req, res) => {
  Admin.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send({
        msg: e.message || 'There was an error while retrieving admins',
      });
    });
};

const findOneAdmin = (req, res) => {
  Admin.findOne({ _id: req.params.id }, (error, admin) => {
    if (!admin) {
      return res.status(404).json({
        msg: `Admin with id: ${req.params.id} was not found`,
      });
    }
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(admin);
  });
};

const updateAdmin = (req, res) => {
  Admin.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedAdmin) => {
      if (!updatedAdmin) {
        return res.status(404).json({
          msg: `Admin with id: ${req.params.id} was not found`,
        });
      }
      if (error) {
        return res.status(400).json(error);
      }
      firebase
        .auth()
        .updateUser(updatedAdmin.firebaseUID, {
          email: req.body.email,
          password: req.body.password,
          displayName: req.body.userName,
        })
        .then(() => res.status(200).json(updatedAdmin))
        .catch((error) => res.status(400).json(error));
    }
  );
};

const deleteAdmin = (req, res) => {
  Admin.findOneAndRemove(
    { _id: req.params.id },
    { useFindAndModify: false },
    (error, adminDeleted) => {
      if (!adminDeleted) {
        return res.status(404).json({
          msg: `Admin with id: ${req.params.id} was not found`,
        });
      }
      if (error) {
        return res.status(400).json(error);
      }
      firebase
        .auth()
        .deleteUser(adminDeleted.firebaseUID)
        .then(() => {
          return res.status(200).send({
            msg: `Admin ${req.params.id} was deleted successfully`,
          });
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    }
  );
};

module.exports = {
  createAdmin,
  findAllAdmins,
  findOneAdmin,
  updateAdmin,
  deleteAdmin,
};
