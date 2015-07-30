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

// Get list of things
exports.index = function(req, res) {

  var tree = dirTree.directoryTree('/Applications/MAMP/htdocs/testShell');


  res.json(tree)
};