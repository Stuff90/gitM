'use strict';

angular.module('gitMApp')
    .controller('NavbarController', function ($scope, $location) {

        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];
    });
