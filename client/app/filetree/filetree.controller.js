'use strict';

angular.module('gitMApp')
    .controller('FiletreeController', [ '$scope', 'ApiService' , 'socket' , function ($scope , ApiService , socket ) {
        console.info('FiletreeController');

        $scope.filteTreeData    = false;
        $scope.isLoading        = false;
        $scope.path             = '/Users/simon/sample/';


        $scope.loadFiltree = function() {
            $scope.isLoading     = true;
            $scope.filteTreeData = false;

            ApiService.getFileTree($scope.path).then(function(filetree){
                $scope.isLoading     = false;
                $scope.filteTreeData = filetree.data;
            });
        }

        $scope.loadFiltree();
  }]);
