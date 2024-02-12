const express = require('express');
const router = express.Router();
const authRouter = require('../middleware/auth');
const marksController = require('../controller/Marks.controller');

router.post('/add', authRouter, marksController.addMarks)

module.exports = router;