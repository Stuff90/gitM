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


class ProjectGenerator {

    copyFile(source, target, cb) {
        var cbCalled = false;

        var rd = fs.createReadStream(source);
            rd.on("error", function(err) {
            done(err);
        });
        var wr = fs.createWriteStream(target);
            wr.on("error", function(err) {
            done(err);
        });
        wr.on("close", function(ex) {
            done();
        });
        rd.pipe(wr);

        function done(err) {
            if (!cbCalled) {
                cb(err);
                cbCalled = true;
            }
        }
    }

    cloneRepository( config , callback ) {
        clone( config.gitRepoUrl , config.path , { checkout: config.branch }, statusCode => {
            callback({
                route: 'api/project/new',
                action: 'clone',
                role: 'Create a new Wordpress project',
                statusCode: statusCode,
                error: statusCode === 0,
            });
        })
    }

    checkout( config , callback ) {
        var cmd = 'cd ' + config.path + '; git checkout ' + config.branch;

        exec( cmd , (error , stdout , stderr ) => {
            console.info(error , stdout , stderr );
            callback({
                route: 'api/project/new',
                action: 'checkout',
                role: 'Checking out to branch ' + config.branch,
                error: error === 0,
                stdout,
                stderr,
            })
        })
    }

    removeGitDir( config , callback ) {
        var cmd = 'cd ' + config.path + '; rm -Rf .git';

        exec( cmd , (error , stdout , stderr ) => {
            console.info(error , stdout , stderr );
            callback({
                route: 'api/project/new',
                action: 'removeGitDir',
                role: 'Remove .git directory',
                error: error === 0,
                stdout,
                stderr,
            })
        })
    }

    initGit( config , callback ) {
        var cmd = 'cd ' + config.path + '; git init';

        exec( cmd , (error , stdout , stderr ) => {
            console.info(error , stdout , stderr );
            callback({
                route: 'api/project/new',
                action: 'initGit',
                role: 'Init git',
                error: error === 0,
                stdout,
                stderr,
            })
        })
    }

    wordpressBoilerPlateClone( config , callback ) {
        clone( 'https://github.com/Stuff90/wp-boilerplate.git' , config.path + '/.cache-gitM' , statusCode => {
            callback({
                route: 'api/project/new',
                action: 'wordpressBoilerPlateClone',
                role: 'Create a new Wordpress project',
                statusCode: statusCode,
                error: statusCode === 0,
            });
        });
    }


    wordpressBoilerPlateInstall( config , callback ) {
        var tmpPath = config.path + '/.cache-gitM';

        async.parallel({

            bowerrc: bowerrcCb => {
                fs.readFile( tmpPath + '/.bowerrc' , 'utf8', ( err , data ) => {
                    if (err) {
                        bowerrcCb(err);
                        return;
                    }

                    var bowerrcJson = JSON.parse(data);

                    bowerrcJson.directory = 'wp-content/themes/' + config.themeName + '/bower_components';

                    jsonfile.writeFile( config.path + '/.bowerrc' , bowerrcJson , {spaces: 2} , function (err) {
                        if (err) {
                            bowerrcCb(err);
                            return;
                        }
                        bowerrcCb( null );
                    });
                });
            },




            bower: bowerCb => {
                fs.readFile( tmpPath + '/bower.json' , 'utf8', ( err , data ) => {
                    if (err) {
                        bowerCb(err);
                        return;
                    }
                    var bowerJson = JSON.parse(data);

                    bowerJson.name        = config.name;
                    bowerJson.themeName   = config.themeName;
                    bowerJson.authors     = [ config.author ];
                    bowerJson.description = config.description;
                    bowerJson.version     = config.themeVersion;

                    jsonfile.writeFile( config.path + '/bower.json' , bowerJson , {spaces: 2} , function (err) {
                        if (err) {
                            bowerCb(err);
                            return;
                        }
                        bowerCb( null );
                    });
                });
            },

            package: packageCb => {
                fs.readFile( tmpPath + '/package.json' , 'utf8', ( err , data ) => {
                    if (err) {
                        packageCb(err);
                        return;
                    }
                    var packageJson = JSON.parse(data);

                    packageJson.name            = config.name;
                    packageJson.themeName       = config.themeName;
                    packageJson.author          = config.author;
                    packageJson.description     = config.description;
                    packageJson.version         = config.themeVersion;

                    jsonfile.writeFile( config.path + '/package.json' , packageJson , {spaces: 2} , function (err) {
                        if (err) {
                            packageCb(err);
                            return;
                        }
                        packageCb( null );
                    });
                });
            },

            configFiles: configFileCb => {
                var allSrc = [
                    {
                        src  : tmpPath + '/' + '.gitignore',
                        dest : config.path + '/' + '.gitignore',
                    },{
                        src  : tmpPath + '/' + 'gulpfile.js',
                        dest : config.path + '/' + 'gulpfile.js',
                    },{
                        src  : tmpPath + '/' + 'wp-content/themes/theme',
                        dest : config.path + '/' + 'wp-content/themes/' + config.themeName,
                    },
                ];

                async.whilst(() => {
                    return allSrc.length > 0;
                }, whilstCb => {
                    var theSrc = allSrc.pop();

                    fs.copy( theSrc.src, theSrc.dest , function (err) {
                        if (err) {
                            whilstCb(err);
                        } else {
                            whilstCb();
                        }
                    });

                }, ( error , results ) => {
                    if(error){
                        configFileCb(error);
                    } else {
                        configFileCb();
                    }
                });
            },

        }, ( error , results ) => {
            callback({
                route: 'api/project/new',
                action: 'wordpressBoilerPlateInstall',
                role: 'Copy all config files at the right path',
                error,
            });
        });
    }

}






// Get list of things
exports.create = function(req, res , u ) {
    var param = req.body;

    var theProjectGenerator = new ProjectGenerator();


    if(typeof theProjectGenerator[param.action] == 'function'){
        theProjectGenerator[param.action](param.data , result => {
            res.json(result);
        });
    }


};
