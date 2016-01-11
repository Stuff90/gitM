'use strict';


angular.module('creatorModule', [ 'firebase' , 'workspaceService' ])
    .directive('creator', [ '$compile' , '$http' , 'workspaceService' , 'creatorManagerService'  , 'localStorageManagerService' , 'STEPLIST_DEFAULT_OPTIONS',
        function ( $compile , $http , workspaceService , creatorManagerService , localStorageManagerService , STEPLIST_DEFAULT_OPTIONS) {

        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: '/components/steps/creator/creator.directive.template.html',
            link: function( scope , element , attrs ){

                /**
                 *
                 * PUBLIC
                 *
                 */

                scope.activeGenerator          = {};
                scope.showForm                 = false;
                scope.activeGeneratorState     = 'saved';
                scope.STEPLIST_DEFAULT_OPTIONS = STEPLIST_DEFAULT_OPTIONS;

                scope.$watch('activeGenerator' , activeGeneratorChanged , true );

                creatorManagerService.list().then(populateGeneratorsList);

                // Private method

                scope.newStep           = newStep;
                scope.removeStep        = removeStep;
                scope.toggleStep        = toggleStep;
                scope.newGenerator      = newGenerator;
                scope.openGenerator     = openGenerator;
                scope.saveGenerator     = saveGenerator;
                scope.fillDefaultValues = fillDefaultValues;
                scope.validateGenerator = validateGenerator;


                // TO DELETE
                scope.log = function(){
                    console.info(scope);

                    console.info(scope.activeGenerator);
                }


                /**
                 *
                 * PRIVATE
                 *
                 */



                function openGenerator( generatorName ){
                    if( !scope.showForm || ( scope.showForm && scope.activeGeneratorState === 'saved' )) {
                        creatorManagerService.get( generatorName ).then(function( result ) {
                            scope.showForm = true;
                            scope.activeGenerator = {
                                name: result.name,
                                path: result.path,
                                params: result.params || {},
                                steps: result.steps || [],
                            };
                        });
                    } else {
                        console.info('Unable to load');
                    }
                }



                function fillDefaultValues( $index , type ){
                    scope.activeGenerator.steps[$index].params = {};
                    scope.activeGenerator.steps[$index].params = angular.extend({} , STEPLIST_DEFAULT_OPTIONS[type] , scope.activeGenerator.steps[$index].params );
                }



                function validateGenerator(){
                    console.info('Validation error');
                }



                function populateGeneratorsList( allGenerators ){
                    scope.allGenerators = allGenerators;
                }



                function activeGeneratorChanged( modifiedGenerator ){
                    if( scope.showForm && scope.activeGeneratorState !== 'saved') {
                        scope.activeGeneratorState = 'unsaved';
                    }
                }



                function removeStep( $index ){
                    for (var i = scope.activeGenerator.steps.length - 1; i >= 0; i--) {
                        if(i === $index) {
                            scope.activeGenerator.steps.splice(i , 1);
                        }
                    };
                }



                function toggleStep( $index ){
                    for (var i = scope.activeGenerator.steps.length - 1; i >= 0; i--) {
                        if(i === $index) {
                            scope.activeGenerator.steps[i].visible = !scope.activeGenerator.steps[i].visible;
                        } else {
                            scope.activeGenerator.steps[i].visible = false;
                        }
                    };
                }



                function saveGenerator(){
                    if( scope.showForm && scope.activeGeneratorState === 'unsaved') {
                        scope.activeGeneratorState = 'saving';

                        var cleanGenerator = angular.copy(scope.activeGenerator),
                        generatorPromise   = creatorManagerService.add( cleanGenerator.name , cleanGenerator );

                        generatorPromise.then(function( result ){
                            scope.activeGeneratorState = 'saved'
                        })
                        generatorPromise.catch(function( result ){
                            console.error(result);
                        })
                    }
                }




                function newStep(){
                    if(scope.showForm) {
                        toggleStep(-1);
                        scope.activeGeneratorState = 'unsaved';
                        scope.activeGenerator.steps.push({
                            visible:true,
                            active:true,
                        });
                    }
                }



                function newGenerator(){
                    if(scope.activeGeneratorState === 'saved' ){
                        scope.showForm = true;
                        scope.activeGeneratorState = 'unsaved';

                        scope.activeGenerator = {
                            steps: [],
                            params: {},
                            isNew: true,
                            path: workspaceService.get(),
                        }
                    } else {
                        console.info('unsaved');
                    }
                }


                // var ref = new Firebase('https://gitm.firebaseio.com/messages');

                // scope.generators = $firebaseObject(new Firebase('https://gitm.firebaseio.com/generators'));
                // scope.generators = $firebaseObject(new Firebase('https://gitm.firebaseio.com/generators'));

                // var ref = new Firebase('https://gitm.firebaseio.com/generators');

                // var u = $firebaseObject(ref.child('gen-name'));

                // u.$bindTo(scope, 'aGen');

                // console.info(u);

                // u.$value = {
                //     kk:'111',
                //     pouet:'111',
                // };

                // u.$save();


                // console.info(scope.generators.$save({u:1}));
                // console.info(scope.generators.$save({
                //     options:{
                //         path:'/'
                //     },
                //     steps: [
                //         {
                //             name: 'a-name',
                //             params: {
                //                 title: 'Deletion'
                //             }
                //         }
                //     ]
                // }));

                // scope.aGen = {
                //     kk:'111',
                //     pouet:'111',
                    // options:{
                    //     path:'/'
                    // },
                    // steps: [
                    //     {
                    //         name: 'a-name',
                    //         params: {
                    //             title: 'Deletion'
                    //         }
                    //     }
                    // ]
                // };

                // scope.u = $firebaseObject(ref);

                // var syncObject = $firebaseObject(ref);


                // scope.messages = $firebaseArray(ref);

                // synchronize the object with a three-way data binding
                // click on `index.html` above to see it used in the DOM!
                // scope.pouet  = 'u';

                // syncObject.$bindTo(scope, "pouet");

                // scope.addMessage = function() {
                //     scope.messages.$add({
                //         text: scope.newMessageText
                //     });
                // };

                // syncObject.$bindTo(scope, "pouet");

                // console.info(scope.u);

                // scope.u.$save({
                //     options:{
                //         path:'/'
                //     },
                //     steps: [
                //         {
                //             name: 'a-name',
                //             params: {
                //                 title: 'Deletion'
                //             }
                //         }
                //     ]
                // })
                // // .$save();

                // console.info(scope.u);



            }
        }
    }]);
