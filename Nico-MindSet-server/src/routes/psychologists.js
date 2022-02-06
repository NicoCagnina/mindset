const express = require('express');
const router = express.Router();

const psychologists = require('../controllers/psychologists');
const {
  createPsychologistValidation,
  editPsychologistValidation,
} = require('../validations/psychologists');
const { authMiddlewarePostulant } = require('../middlewares/authMiddleware');

router.get('/', authMiddlewarePostulant, psychologists.getPsychologists);
router.get('/:id', authMiddlewarePostulant, psychologists.getOnePsychologist);
router.post(
  '/',
  authMiddlewarePostulant,
  createPsychologistValidation,
  psychologists.createPsychologist
);
router.delete(
  '/:id',
  authMiddlewarePostulant,
  psychologists.deletePsychologist
);
router.put(
  '/:id',
  authMiddlewarePostulant,
  editPsychologistValidation,
  psychologists.editPsychologist
);

module.exports = router;
