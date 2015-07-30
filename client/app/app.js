'use strict';

angular.module('gitMApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'btford.socket-io',
        'ui.router',
        'ui.bootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl:'/app/main/main.html',
                views: {
                    "main": {
                        templateUrl: "/app/main/main.html",
                        controller: "MainCtrl"
                    },
                    "header@index": {
                        templateUrl: "/app/navbar/navbar.html",
                        controller: "NavbarCtrl"
                    },
                    "leftColumn@index": {
                        templateUrl: "/app/filetree/filetree.html",
                        controller: "FiletreeCtrl"
                    },
                    "center@index": {
                        templateUrl: "/app/stdOut/stdOut.html",
                        controller: "StdOutCtrl"
                    },
                    "rightColumn@index": {
                        templateUrl: "/app/file/file.html",
                        controller: "FileCtrl"
                    }
                }
            });

        $locationProvider.html5Mode(true);
    }).
    factory('socket', function (socketFactory) {
        return socketFactory();
    });
