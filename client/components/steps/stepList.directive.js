'use strict';


angular.module('stepListModule' , [ 'stepModule' , 'creatorModule' ])
    .directive('stepList', [ '$compile' , '$http' , '$timeout' , function ( $compile , $http , $timeout ) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                manager: '='
            },
            templateUrl: '/components/steps/stepList.directive.template.html',
            link: function( scope , element , attrs ){

                /**
                 *
                 * PUBLIC
                 *
                 */

                scope.ready = false;

                scope.$watch('list' , updateSteps)
                scope.$on('steps:start' , start);

                /**
                 *
                 * PRIVATE
                 *
                 */

                function start() {
                    if(Object.keys(scope.list).length > 0){
                        startStep( scope.list , 0 );
                    }
                }

                function updateSteps( allSteps ) {
                    if(allSteps === undefined){
                        scope.ready = false;
                    } else {
                        scope.ready = true;
                    }
                }

                function startStep( allSteps , index ) {

                    allSteps[index].state  = 'doing';
                    var currentStepPromise = allSteps[index].start();

                    currentStepPromise.then(function(){
                        $timeout(function(){
                            allSteps[index].state = 'done';

                            if((index + 1) >= allSteps.length ){
                                scope.$emit('steps:done');
                                return
                            } else {
                                    startStep( allSteps , index + 1 );
                            }
                        } , 500 );
                    } , function( error ){
                        allSteps[index].state = 'error';
                        allSteps[index].error = 'Error occured: ' + error;
                    })
                }

            }
        }
    }]);
