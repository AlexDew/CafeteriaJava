const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const { autenticar } = require('../middleware/auth');

const router = Router();
const controller = new AuthController();

router.post('/login', controller.login);
router.get('/verificar', autenticar, controller.verificar);

module.exports = router;
