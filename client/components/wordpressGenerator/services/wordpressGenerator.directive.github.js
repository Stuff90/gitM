'use strict';

angular.module('wordpressGenerator')
    .service( 'wordpressGithubService' , [ 'localStorageService' , '$http' , '$q' , '$timeout' , 'WPGEN_CONST' , wordpressGithubService ]);

function wordpressGithubService ( localStorageService , $http , $q , $timeout , WPGEN_CONST ) {

    var wordpressGithubServiceClass = function wordpressGithubServiceClass(){
        var self = this;

        if(!localStorageService.isSupported) {
            console.error('Local storage is needed, please use a browser allowing it.');
        }

        return {
            getAllBranches: function(){
                return self.retrieveBranchList();
            },
            clearBranchList: function() {
                return localStorageService.remove('allBranchesList');
            }
        }
    }

    wordpressGithubServiceClass.prototype = {

        retrieveBranchList: function () {
            var self    = this,
            deferred    = $q.defer(),
            branchList  = self.getBranchList();

            if(!branchList){
                $http.get( WPGEN_CONST.api.branches ).then(function( request ){
                    self.storeBranchList( request.data );
                    deferred.resolve(request.data);
                });
            } else {
                deferred.resolve(branchList);
            }

            return deferred.promise;
        },

        getBranchList: function () {
            return localStorageService.get( 'allBranchesList' );
        },

        storeBranchList: function ( allBranches ) {
            console.info('Storing al branches data');
            return localStorageService.set( 'allBranchesList',  allBranches );
        }

    }

    return new wordpressGithubServiceClass();
}
