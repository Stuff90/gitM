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
    exec    = require('child_process').exec;


var FilesGetter = function FilesGetter() {

    var self = this;


    return {
        content: function( path , callback ) {
            self.getFileContent( path , callback );
        }
    }
}

FilesGetter.prototype = {

    getFileContent: function( aPath , callback ) {
        exec("cat "+ aPath , function (error, stdout, stderr) {
            if(error === null && stderr.length < 1) {
                callback(stdout);
            };
        });
    }

}


exports.get = new FilesGetter();



