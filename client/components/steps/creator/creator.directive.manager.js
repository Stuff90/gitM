
'use strict';

angular.module('creatorModule')
    .service( 'creatorManagerService' , [ '$firebaseObject' , '$q' , creatorManagerService ]);

function creatorManagerService ( $firebaseObject , $q ) {
    var creatorManagerService = function creatorManagerService(){
        var self = this;

        return {

            get: function( name ){
                return self.get( name );
            },

            addGenerator: function( name , options ){
                self.add( 'generator' , name , options );
            },

            addStep: function( name , step ){
            },

            list: function(){
                return self.list();
            },

            delete: function( name ){
            },

        }
    }

    creatorManagerService.prototype = {

        initRef: function( path ){
            return new Firebase('https://gitm.firebaseio.com/' + path );
        },

        exist: function( parent , child ){
            var deferred = $q.defer();

            this.initRef( parent ).once('value', function(snapshot) {
                if(snapshot.hasChild( child )){
                    deferred.resolve({
                        snapshot: snapshot
                    });
                } else {
                    deferred.reject({
                        error:'Child not fount'
                    })
                }
            })


            return deferred.promise;
        },

        get: function( name ){
            var self = this,
            deferred = $q.defer();

            this.exist('generators', name )
                .then(function(){
                    var theFbObject = $firebaseObject(self.initRef( 'generators/' + name ))
                    deferred.resolve(theFbObject);
                })
                .catch(function( error ){
                    deferred.reject(error);
                })

            return deferred.promise;
        },

        add: function( type , generatorName , options ){
            var self = this,
            deferred = $q.defer();

            this.exist('generators', generatorName )
                .then(function(){
                    deferred.reject({ error: 'Invalid name : Already exists' });
                })
                .catch(function( error ){
                    var theFbObject = $firebaseObject(self.initRef( 'generators/' + generatorName ))
                    theFbObject.$value = options;
                    theFbObject.$save();
                    deferred.resolve( theFbObject );
                });

            return deferred.promise;
        },

        list: function(){
            var self    = this,
            deferred    = $q.defer(),
            theFbObject = $firebaseObject(self.initRef( 'generators' ));

            deferred.resolve(theFbObject);

            return deferred.promise;
        },

        delete: function( name ){
        },

    }

    return new creatorManagerService();
}
/*

angular.module('creatorModule')
    .service('creator', [ '$compile' , '$http' , '$firebaseArray' , '$firebaseObject' ,
        function ( $compile , $http , $firebaseArray , $firebaseObject ) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            templateUrl: '/components/steps/creator/creator.directive.template.html',
            link: function( scope , element , attrs ){

                // var ref = new Firebase('https://gitm.firebaseio.com/messages');

                // scope.generators = $firebaseObject(new Firebase('https://gitm.firebaseio.com/generators'));
                // scope.generators = $firebaseObject(new Firebase('https://gitm.firebaseio.com/generators'));

                var ref = new Firebase('https://gitm.firebaseio.com/generators');

                var u = $firebaseObject(ref.child('gen-name'));

                // u.$bindTo(scope, 'aGen');

                console.info(u);

                u.$value = {
                    kk:'111',
                    pouet:'111',
                };

                u.$save();


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

                scope.aGen = {
                    kk:'111',
                    pouet:'111',
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
                };

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
/*

            }
        }
    }]);
*/
