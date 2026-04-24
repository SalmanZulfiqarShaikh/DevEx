const express = require('express');
const router = express.Router();
const { login } = require('../contollers/User/UserLogin');

router.post('/', login);

module.exports = router;