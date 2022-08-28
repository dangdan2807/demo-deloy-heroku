const express = require('express');
const siteController = require('../app/controllers/site.controller');
const router = express.Router();

router.use('/', siteController.home);

module.exports = router;