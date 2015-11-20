'use strict';

angular.module('gitMApp')
    .controller('NavbarController', function ($scope, $location) {
        console.info('NavbarController');

        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];
    });
