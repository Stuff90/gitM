'use strict';

angular.module('gitMApp')
    .service('FileService', [ '$http' , '$q' , 'ApiService' , function ( $http , $q , ApiService ) {
       var FileService = function FileService () {
           var self = this;

           return {
               focus: function( path ) {
                    ApiService.getFile( path ).then(function( theFile ){
                        self.deferred.resolve(theFile.data);
                    });
               },
               onFileFocus: function() {
                    return self.deferred.promise;
               },
           }
       };

       FileService.prototype = {
            deferred: $q.defer()
       };

       return new FileService();

    }]);
