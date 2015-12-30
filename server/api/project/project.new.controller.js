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
    app     = require('../../app'),
    clone   = require('git-clone');




// Get list of things
exports.create = function(req, res , u ) {
    var config = req.body;

    clone( config.gitRepoUrl , config.path , { checkout: config.branch }, statusCode => {
        res.json({
            route: 'api/project/new',
            role: 'Create a new Wordpress project',
            statusCode: statusCode,
            error: statusCode === 0,
        });
    })
};
