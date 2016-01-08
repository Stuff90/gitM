'use strict';

var express = require('express'),
controller  = {
    main: require('./github.controller'),
};

var router = express.Router();

router.get('/',     controller.main.get );
router.post('/',    controller.main.create );
router.put('/',     controller.main.update );

module.exports = router;
