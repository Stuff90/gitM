/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var dirTree = require('directory-tree');
// var simpleGit = require('simple-git')('/Applications/MAMP/htdocs/LessTree');


// Get list of things
exports.index = function(req, res) {

  var tree = dirTree.directoryTree('.');

    // simpleGit.log(function(err, log) {
    //     console.log(log);
        res.json('log')
    // })

};