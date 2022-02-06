const express = require('express');
const router = express.Router();
const Clients = require('../controllers/clients');
const validateClient = require('../validations/clients');
const { authMiddlewareAdmin } = require('../middlewares/authMiddleware');

router.post(
  '/',
  authMiddlewareAdmin,
  validateClient.required,
  Clients.createClient
);
router.get('/', authMiddlewareAdmin, Clients.getClients);
router.get('/:id', authMiddlewareAdmin, Clients.getOneClient);
router.put(
  '/:id',
  authMiddlewareAdmin,
  validateClient.required,
  Clients.updateClient
);
router.delete('/:id', authMiddlewareAdmin, Clients.deleteClient);

module.exports = router;
