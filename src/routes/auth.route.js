const express = require('express');
const authMiddleware = require('../app/middlewares/auth.middleware');
const authController = require('../app/controllers/auth.controller');
const router = express.Router();

router.post(['/dang-ky', '/register'], authController.register);
router.post(['/dang-nhap', '/login'], authController.login);
router.get('/', authMiddleware.verifyToken, authController.checkLoggedIn);

module.exports = router;
