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
    q       = require('q'),
    File    = require('../../components/file/index'),
    exec    = require('child_process').exec;


var FiletreeController = function FiletreeController() {

    var self = this;


    return {
        refreshTree: function(path) {
            self.refresh(path);
        },
        getTree: function( path , callback) {
            self.refresh(path , callback);
        }
    }
}

FiletreeController.prototype = {

    cleanFiles: function( theTree , ignoredFiles ) {

        app.io.emit('Filetree:log', ignoredFiles);

        for(var index in theTree) {
            var aFile = theTree[index];
            // if(index === 8 ){
            //     theTree.children.splice(8, 1)
            // }
            if( ~ignoredFiles.indexOf(aFile.path) < 0 ) {
                theTree.splice(index, 1)
                // app.io.emit('Filetree:log', [aFile.path, aFile.name]);
            } else if( !!aFile.children ) {
                app.io.emit('Filetree:log', aFile.path );
                aFile.children = this.cleanFiles( aFile.children , ignoredFiles );
            }
        }

        return theTree;


        app.io.emit('Filetree:log', theTree.length);

        // for (var i = theTree.children.length - 1; i >= 0; i--) {
        //     var aFile = theTree.children[i];


        // };
    },

    checkGitignore: function() {
        var self = this;

        app.io.emit('Filetree:ready', self.tree);

        for (var i = 0; i < this.tree.children.length; i++) {
            var aChild = this.tree.children[i];


            if(aChild.name == '.gitignore') {
                File.get.content('/Users/simon/sample/.gitignore', function( data ){
                    app.io.emit('File:show', data);
                    // app.io.emit('Filetree:log', data.split(/\s+/));
                })
            //     exec("cat "+ aChild.name , function (error, stdout, stderr) {
            //         if(error === null && stderr.length < 1) {
            //             self.tree.children = self.cleanFiles( self.tree.children , stdout.split(/\s+/));
                        // app.io.emit('Filetree:ready', self.tree);
            //         };
            //     });
            }
        };
    },

    refresh: function( aPath ) {
        this.tree = dirTree.directoryTree(aPath);
        this.checkGitignore();
    }

}


var theController = new FiletreeController();




// Get list of things
exports.index = function(req, res) {
    // theController.refreshTree( req.query.path );
    // var deferred = q.defer();
    console.info();

    res.json(dirTree.directoryTree(req.query.path));
};


// Get list of things
exports.file = function(req, res) {
    // theController.refreshTree( req.query.path );
    console.info('Hey');
};




