'use strict';


angular.module('wordpressGenerator' , [])
    .directive('wordpressGn', [ '$compile' , '$http' , 'WPGEN_CONST' , function ( $compile , $http , WPGEN_CONST ) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                path:'='
            },
            templateUrl: '/components/wordpressGenerator/wordpressGenerator.directive.template.html',
            link: function( scope , element , attrs ){

                // var apiCall = {
                //     branches: 'https://api.github.com/repos/WordPress/WordPress/branches'
                // }

                console.info('Wordpress gen directive');


            }
        }
    }]);
