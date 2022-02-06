const express = require('express');
const router = express.Router();

const profile = require('../controllers/profiles');
const { missingInputs } = require('../validations/profiles');
const { authMiddlewarePsychologist } = require('../middlewares/authMiddleware');

router.get('/', authMiddlewarePsychologist, profile.getProfiles);
router.get('/:id', authMiddlewarePsychologist, profile.getOneProfile);
router.post(
  '/',
  authMiddlewarePsychologist,
  missingInputs,
  profile.createProfile
);
router.delete('/:id', authMiddlewarePsychologist, profile.deleteProfile);
router.put('/:id', authMiddlewarePsychologist, profile.editProfile);

module.exports = router;
