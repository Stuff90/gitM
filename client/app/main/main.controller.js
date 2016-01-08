'use strict';

angular.module('gitMApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    console.info('MainCtrl');

        socket.on('log', function( data ){
            console.info(data);
        });
  });