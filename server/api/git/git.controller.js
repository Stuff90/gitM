/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var dirTree = require('directory-tree'),
    fs          = require('fs-extra'),
    async       = require('async'),
    jsonfile    = require('jsonfile'),
    app         = require('../../app'),
    clone       = require('git-clone'),
    exec        = require('child_process').exec;





/**
 *
 * HTTP POST request is used to trigger the git init
 *
 */

exports.create = function(req, res ) {
    var param   = req.body,
    command     = 'cd ' + param.path + '; git init ';

    exec( command , (error , stdout , stderr ) => {
        res.json({
            route: 'api/github',
            param,
            error
        });
    })

};

