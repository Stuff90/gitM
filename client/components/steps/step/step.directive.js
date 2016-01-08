'use strict';


angular.module('stepModule', [])
    .directive('step', [ '$compile' , '$http' , function ( $compile , $http ) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            templateUrl: '/components/steps/step/step.directive.template.html',
            link: function( scope , element , attrs ){

                /**
                 *
                 * PUBLIC
                 *
                 */

                // console.info('Hey');

                /**
                 *
                 * PRIVATE
                 *
                 */


            }
        }
    }]);
