'use strict';

angular.module('gitMApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'btford.socket-io',
        'ui.router',
        'ngMaterial',
        'ngMessages',
        'ngMdIcons',
        'ngDialog',

        'wordpressGenerator',
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
                        controller: "NavbarController"
                    },
                    "leftColumn@index": {
                        templateUrl: "/app/filetree/filetree.html",
                        controller: "FiletreeController"
                    },
                    // "rightColumn@index": {
                    //     templateUrl: "/app/stdOut/stdOut.html",
                    //     controller: "StdOutCtrl"
                    // },
                    "center@index": {
                        templateUrl: "/app/file/file.html",
                        controller: "FileController"
                    }
                }
            });

        $locationProvider.html5Mode(true);
    }).
    factory('socket', function (socketFactory) {
        return socketFactory({
            ioSocket: io.connect('http://localhost:9000')
        });
    });
