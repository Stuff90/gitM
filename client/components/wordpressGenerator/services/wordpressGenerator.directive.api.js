'use strict';

angular.module('wordpressGenerator')
    .service( 'wordpressApiService' , [ '$http' , '$q' , '$timeout' , 'WPGEN_CONST' , wordpressApiService ]);

function wordpressApiService ( $http , $q , $timeout , WPGEN_CONST ) {

    var wordpressApiServiceClass = function wordpressApiServiceClass(){
        var self = this;

        return {
            clone: function( config ){
                return self.call( '/api/project/new' , 'cloneRepository' , config );
            },
            checkout: function( config ){
                return self.call( '/api/project/new' , 'checkout' , config );
            },
            removeGitDir: function( config ){
                return self.call( '/api/project/new' , 'removeGitDir' , config );
            },
            initGit: function( config ){
                return self.call( '/api/project/new' , 'initGit' , config );
            },
            wordpressBoilerPlateClone: function( config ){
                return self.call( '/api/project/new' , 'wordpressBoilerPlateClone' , config );
            },
            wordpressBoilerPlateInstall: function( config ){
                return self.call( '/api/project/new' , 'wordpressBoilerPlateInstall' , config );
            },
        }
    }

    wordpressApiServiceClass.prototype = {

        call: function ( url , action , param ) {
            var data = {
                action: action,
                data: param || {}
            }

            return $http.post('/api/project/new' , data );
        },

    }

    return new wordpressApiServiceClass();
}
