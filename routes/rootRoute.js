const express = require('express');
const { join } = require('path');

const { loadMainPage } = require(join(PATHS.controllers, '/rootControllers'))

const router = express.Router();

router.get('/', loadMainPage)

module.exports = router;