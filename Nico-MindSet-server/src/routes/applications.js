const express = require('express');
const controller = require('../controllers/applications');
const validation = require('../validations/applications');
const router = express.Router();
const { authMiddlewareAdmin } = require('../middlewares/authMiddleware');

const {
  createApplication,
  deleteApplication,
  getApplications,
  getApplicationById,
  updateApplication,
} = controller;

const { validateApplicationCreation } = validation;

router.post(
  '/',
  authMiddlewareAdmin,
  validateApplicationCreation,
  createApplication
);
router.delete('/:_id', authMiddlewareAdmin, deleteApplication);
router.get('/', authMiddlewareAdmin, getApplications);
router.get('/:_id', authMiddlewareAdmin, getApplicationById);
router.put('/:_id', authMiddlewareAdmin, updateApplication);

module.exports = router;
