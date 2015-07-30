'use strict';

angular.module('gitMApp')
    .controller('FiletreeCtrl', function ($scope, $http , socket) {
        console.info('FiletreeCtrl');

        $scope.filteTreeData = [];

        $scope.getFiletree = function() {
            $http.get('/api/filetrees').success(function(root) {
                root.open = true;
                $scope.filteTreeData = root.children;
            });
        }

        $scope.getFiletree();
  });