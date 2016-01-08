'use strict';

angular.module('gitMApp')
    .service('ApiService', [ '$http' , function ($http) {
       var ApiService = function ApiService () {
           var self = this;

           return {
               getFileTree: function( path ) {
                    return $http({
                        url: '/api/filetrees',
                        method: "GET",
                        params: { path : path}
                    })
               },
               getFile: function( path ) {
                    return $http({
                        url: '/api/file',
                        method: "GET",
                        params: { path : path}
                    })
               },
           }
       };

       ApiService.prototype = {};

       return new ApiService();

    }]);
