const express = require('express');
const controller = require('../controllers/sessions');
const validation = require('../validations/sessions');
const router = express.Router();
const { authMiddlewarePostulant } = require('../middlewares/authMiddleware');

const {
  getSessions,
  getOneSession,
  editSession,
  createSession,
  deleteSession,
} = controller;

/*const {
  validateSessionCreation,
  validateTimeOfSession
} = validation;*/

router.post(
  '/',
  authMiddlewarePostulant,
  /*validateSessionCreation, validateTimeOfSession,*/ createSession
);
router.delete('/:id', authMiddlewarePostulant, deleteSession);
router.get('/', authMiddlewarePostulant, getSessions);
router.get('/:id', authMiddlewarePostulant, getOneSession);
router.put('/:id', authMiddlewarePostulant, editSession);

module.exports = router;
