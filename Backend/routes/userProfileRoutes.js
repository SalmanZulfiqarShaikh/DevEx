const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../contollers/User/userProfile');
const { isLoggedIn } = require('../middlewares/User/isLoggedin');
const upload = require('../utils/multerConfig');

router.get('/', isLoggedIn, getProfile);
router.put('/', isLoggedIn, upload.single('profilePic'), updateProfile);

module.exports = router;
