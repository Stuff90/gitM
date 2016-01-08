'use strict';

angular.module('wordpressGenerator')
    .service( 'wordpressGnApiService' , [ 'localStorageService' , '$http' , '$q' , '$timeout' , 'WPGEN_CONST' , wordpressGnApiService ]);

function wordpressGnApiService ( localStorageService , $http , $q , $timeout , WPGEN_CONST ) {

    // $http.get( WPGEN_CONST.api.branches ).then(listBranches);



    var WordpressGnApiServiceClass = function WordpressGnApiServiceClass(){
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

    WordpressGnApiServiceClass.prototype = {

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

    return new WordpressGnApiServiceClass();
}
