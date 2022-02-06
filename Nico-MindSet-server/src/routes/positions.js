const express = require('express');
const router = express.Router();
const positions = require('../controllers/positions');
const validatePosition = require('../validations/positions');
const { authMiddlewareAdmin } = require('../middlewares/authMiddleware');

router.post(
  '/',
  authMiddlewareAdmin,
  validatePosition.required,
  positions.createPosition
);
router.get('/', positions.getPositions);
router.get('/:id', authMiddlewareAdmin, positions.getOnePosition);
router.put('/:id', authMiddlewareAdmin, positions.updatePosition);
router.delete('/:id', authMiddlewareAdmin, positions.deletePosition);

module.exports = router;
