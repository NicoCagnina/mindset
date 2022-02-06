const router = require('express').Router();
const {
  findAllAdmins,
  findOneAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require('../controllers/admins');
const {
  validateBodyContent,
  validateAdminCreation,
} = require('../validations/admins');
const { authMiddlewareAdmin } = require('../middlewares/authMiddleware');

router.get('/', authMiddlewareAdmin, findAllAdmins);
router.get('/:id', authMiddlewareAdmin, findOneAdmin);
router.post('/', authMiddlewareAdmin, validateAdminCreation, createAdmin);
router.put('/:id', authMiddlewareAdmin, validateBodyContent, updateAdmin);
router.delete('/:id', authMiddlewareAdmin, deleteAdmin);

module.exports = router;
