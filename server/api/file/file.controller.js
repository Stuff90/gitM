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
    async   = require('async'),
    fs      = require('fs-extra'),
    app     = require('../../app'),
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


/**
 *
 * HTTP DELETE will remove file or directory
 *
 */

exports.update = function(req, res) {
    var param = req.body;

    if(Array.isArray(param.path)){
        var pathPile = param.path.slice(0);

        async.whilst(
            () => {
                return pathPile.length > 0;
            },
            whilstCallback => {
                fs.remove( pathPile.pop() , function ( error ) {
                    whilstCallback( null , error )
                });
            },
            function ( error , result ) {
                res.json({
                    route: 'api/file',
                    param,
                    error: result
                })

                // 5 seconds have passed, n = 5
            }
        );
    } else {
        fs.remove( param.path , function ( error ) {
            res.json({
                route: 'api/file',
                param,
                error
            })
        })
    }
};
