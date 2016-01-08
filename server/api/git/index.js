'use strict';

var express = require('express'),
controller  = {
    main: require('./git.controller'),
};

var router = express.Router();

router.post('/',    controller.main.create );

module.exports = router;
