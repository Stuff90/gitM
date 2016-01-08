'use strict';

angular.module('gitMApp', [
        'ngDialog',
        'ngCookies',
        'ngMdIcons',
        'ui.router',
        'ngSanitize',
        'ngMaterial',
        'ngMessages',
        'ngResource',
        'btford.socket-io',
        'LocalStorageModule',

        'stepListModule',
        'wordpressGenerator',
    ])
    .config([ '$stateProvider' , '$urlRouterProvider' , '$locationProvider' , 'localStorageServiceProvider' , function( $stateProvider , $urlRouterProvider , $locationProvider , localStorageServiceProvider ) {
        localStorageServiceProvider
            .setPrefix('gitMApp')
            .setNotify(true, true);

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
                    "menu@index": {
                        templateUrl: "/app/menu/menu.html",
                        controller: "MenuController"
                    },
                }
            })
            .state('generator', {
                url: '/generator',
                templateUrl:'/app/main/main.html',
                params: { config: null },
                views: {
                    "main": {
                        templateUrl: "/app/main/main.html",
                        controller: "MainCtrl"
                    },
                    "header@generator": {
                        templateUrl: "/app/generator/generator.html",
                        controller: "ProjectController",
                    },
                    "menu@generator": {
                        templateUrl: "/app/menu/menu.html",
                        controller: "MenuController"
                    },
                }
            })
            .state('project:new', {
                url: '/project/new',
                templateUrl:'/app/main/main.html',
                params: { config: null },
                views: {
                    "main": {
                        templateUrl: "/app/main/main.html",
                        controller: "MainCtrl"
                    },
                    "header@project:new": {
                        templateUrl: "/app/project/project.html",
                        controller: "ProjectController",
                    },
                    "menu@project:new": {
                        templateUrl: "/app/menu/menu.html",
                        controller: "MenuController"
                    },
                }
            })
            .state('project', {
                url: '/project',
                templateUrl:'/app/main/main.html',
                views: {
                    "main": {
                        templateUrl: "/app/main/main.html",
                        controller: "MainCtrl"
                    },
                    "header@project": {
                        templateUrl: "/app/navbar/navbar.html",
                        controller: "NavbarController"
                    },
                    "leftColumn@project": {
                        templateUrl: "/app/filetree/filetree.html",
                        controller: "FiletreeController"
                    },
                    "menu@project": {
                        templateUrl: "/app/menu/menu.html",
                        controller: "MenuController"
                    },
                    "center@project": {
                        templateUrl: "/app/file/file.html",
                        controller: "FileController"
                    }
                }
            });

        $locationProvider.html5Mode(true);
    }]).
    factory('socket', function (socketFactory) {
        return socketFactory({
            ioSocket: io.connect('http://localhost:9000')
        });
    });
