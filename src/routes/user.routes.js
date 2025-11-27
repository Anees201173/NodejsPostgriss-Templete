const express = require('express');
const ctrl = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// Auth
router.post('/register', ctrl.register);
router.post('/login', ctrl.login);

// Self
router.get('/me', auth, ctrl.me);

// CRUD (could be protected as needed)
router.get('/', auth, ctrl.list);
router.get('/:id', auth, ctrl.getById);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
