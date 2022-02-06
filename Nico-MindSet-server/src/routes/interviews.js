const express = require('express');
const router = express.Router();

const interviews = require('../controllers/interviews');
const missingInputsValidation = require('../validations/interviews');
const { authMiddlewarePostulant } = require('../middlewares/authMiddleware');

router.get('/', authMiddlewarePostulant, interviews.getInterviews);
router.get('/:id', authMiddlewarePostulant, interviews.getOneInterview);
router.post(
  '/',
  authMiddlewarePostulant,
  missingInputsValidation,
  interviews.createInterview
);
router.delete('/:id', authMiddlewarePostulant, interviews.deleteInterview);
router.put('/:id', authMiddlewarePostulant, interviews.editInterview);

module.exports = router;
