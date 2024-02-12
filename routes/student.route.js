const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth')
const studentController = require('../controller/Student.controller')


router.post('/add', studentController.addStudent);
router.post('/login', studentController.login);
module.exports = router;