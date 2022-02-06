const express = require('express');
const router = express.Router();

const auth = require('./auth');
const admins = require('./admins');
const applications = require('./applications');
const clients = require('./clients');
const interviews = require('./interviews');
const positions = require('./positions');
const postulants = require('./postulants');
const profiles = require('./profiles');
const psychologists = require('./psychologists');
const sessions = require('./sessions');

router.use('/auth', auth);
router.use('/admins', admins);
router.use('/clients', clients);
router.use('/applications', applications);
router.use('/interviews', interviews);
router.use('/positions', positions);
router.use('/postulants', postulants);
router.use('/profiles', profiles);
router.use('/psychologists', psychologists);
router.use('/sessions', sessions);

module.exports = router;
