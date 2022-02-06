const express = require('express');
const {
  registerPostulant,
  registerPsychologist,
  registerAdmin,
} = require('../controllers/auth');
const { authMiddlewareAdmin } = require('../middlewares/authMiddleware');
const validations = require('../validations/auth');

const router = express.Router();

router.post('/register', validations.required, registerPostulant);
router.post(
  '/register/psychologist',
  authMiddlewareAdmin,
  validations.required,
  registerPsychologist
);
router.post(
  '/register/admin',
  authMiddlewareAdmin,
  validations.required,
  registerAdmin
);

module.exports = router;
