'use strict';


angular.module('creatorModule', ['firebase'])
    .directive('creator', [ '$compile' , '$http' , 'creatorManagerService', 'STEPLIST_DEFAULT_OPTIONS',
        function ( $compile , $http , creatorManagerService , STEPLIST_DEFAULT_OPTIONS) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            templateUrl: '/components/steps/creator/creator.directive.template.html',
            link: function( scope , element , attrs ){

                /**
                 *
                 * PUBLIC
                 *
                 */

                scope.STEPLIST_DEFAULT_OPTIONS = STEPLIST_DEFAULT_OPTIONS;
                scope.saveGenerator            = saveGenerator;
                scope.newGenerator             = newGenerator;
                scope.removeStep               = removeStep;
                scope.toggleStep               = toggleStep;
                scope.newStep                  = newStep;
                scope.showForm                 = false;
                scope.activeGeneratorSaved     = true;
                scope.activeGenerator          = {};

                // var newGenerator = {
                //     options: {
                //         path: '/'
                //     }
                // }

                console.info(STEPLIST_DEFAULT_OPTIONS);

                // creatorManagerService.addGenerator( 'gen-name' , newGenerator );

                creatorManagerService.list().then(function( allGenerators ){
                    scope.allGenerators = allGenerators;

                    console.info(scope.allGenerators);
                })



                scope.log = function(){
                    console.info(scope.activeGenerator);
                }



                scope.fillDefaultValues = function( $index , type ){
                    scope.activeGenerator.steps[$index].params = angular.extend({} , STEPLIST_DEFAULT_OPTIONS[type] , scope.activeGenerator.steps[$index].params );
                }

                /**
                 *
                 * PRIVATE
                 *
                 */



                function removeStep( $index ){
                    scope.activeGeneratorSaved = false;
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



                // function saveGenerator(){
                //     if( scope.showForm && !scope.activeGeneratorSaved) {
                //     }
                // }



                function saveGenerator(){
                    if( scope.showForm && !scope.activeGeneratorSaved) {
                    }
                }




                function newStep(){
                    if(scope.showForm) {
                        toggleStep(-1);
                        scope.activeGeneratorSaved = false;
                        scope.activeGenerator.steps.push({
                            visible:true,
                            active:true,
                        });
                    }
                }



                function newGenerator(){
                    if(scope.activeGeneratorSaved){
                        scope.showForm = true;
                        scope.activeGeneratorSaved = false;

                        scope.activeGenerator = {
                            steps: [],
                            params: {},
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
