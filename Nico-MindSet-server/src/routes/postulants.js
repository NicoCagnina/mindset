const router = require('express').Router();
const {
  getPostulants,
  getOnePostulant,
  createPostulant,
  editPostulants,
  deletePostulants,
} = require('../controllers/postulants');
const { missingInputs } = require('../validations/postulants');
const {
  authMiddlewareAdmin,
  authMiddlewarePsychologist,
  authMiddlewareSelfPostulant,
} = require('../middlewares/authMiddleware');

router.get('/', authMiddlewarePsychologist, getPostulants);
router.get('/:id', authMiddlewareSelfPostulant, getOnePostulant);
router.post('/', authMiddlewareAdmin, missingInputs, createPostulant);
router.put('/:id', authMiddlewareSelfPostulant, editPostulants);
router.delete('/:id', authMiddlewareAdmin, deletePostulants);

module.exports = router;
