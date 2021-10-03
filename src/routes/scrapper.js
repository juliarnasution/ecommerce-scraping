const express = require('express');
const router = express.Router();
const scrapper_controller = require('../controller/scrapper');

/* GET home page. */
router.use('/search', scrapper_controller.search);

module.exports = router;
