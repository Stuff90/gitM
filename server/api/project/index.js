'use strict';

var express = require('express'),
controller  = {
    main: require('./project.controller'),
    new: require('./project.new.controller'),
};

var router = express.Router();

router.get('/', controller.main.index );
router.post('/new', controller.new.create );

module.exports = router;
