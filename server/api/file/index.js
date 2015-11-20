'use strict';

var express = require('express');
var controller = require('./file.controller');

var router = express.Router();

router.get('/', controller.index);
// router.get('/file', controller.file);

module.exports = router;