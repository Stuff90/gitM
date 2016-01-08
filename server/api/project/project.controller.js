/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';



// Get list of things
exports.index = function(req, res) {
    res.json({
        route: 'api/project',
        result: 'ok'
    });

    // fs.readFile( theFilePath , 'utf8', ( error , theFileContent ) => {
    //     if(error) {
    //         res.json(error);
    //     } else {
    //         var fileNameRegexp  = /([\.\-\_a-zA-Z0-9]+)$/gm,
    //         explodedFileName    = fileNameRegexp.exec(theFilePath);

    //         res.json({
    //             path    : theFilePath,
    //             content : theFileContent.split(/\n/g),
    //             name    : explodedFileName[0],
    //         })
    //     }
    // });
};
