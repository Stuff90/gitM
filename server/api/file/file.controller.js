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
    fs      = require('fs'),
    File    = require('../../components/file/index');




// Get list of things
exports.index = function(req, res) {
    var theFilePath = req.query.path;

    fs.readFile( theFilePath , 'utf8', ( error , theFileContent ) => {
        if(error) {
            res.json(error);
        } else {
            var fileNameRegexp  = /([\.\-\_a-zA-Z0-9]+)$/gm,
            explodedFileName    = fileNameRegexp.exec(theFilePath);

            res.json({
                path    : theFilePath,
                content : theFileContent.split(/\n/g),
                name    : explodedFileName[0],
            })
        }
    });
};
