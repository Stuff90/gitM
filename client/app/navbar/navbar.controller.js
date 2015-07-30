'use strict';

angular.module('gitMApp')
    .controller('NavbarCtrl', function ($scope, $location) {
        console.info('NavbarCtrl');

        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];
    });