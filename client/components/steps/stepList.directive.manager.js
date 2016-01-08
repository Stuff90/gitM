'use strict';

angular.module('stepListModule')
    .service( 'stepListManagerService' , [ '$http' , '$timeout' , '$q' , 'STEPLIST_DEFAULT_OPTIONS' , stepListManagerService ]);

function stepListManagerService ( $http , $timeout , $q , STEPLIST_DEFAULT_OPTIONS ) {



    var StepManager = function StepManager(){
        var self    = this;
    }

    StepManager.prototype = {

        checkRequired: function( required , params ){
            for (var i = required.length - 1; i >= 0; i--) {
                if(!params.hasOwnProperty(required[i].id)){
                    console.error('Parameter' , required[i].id , 'is missing on list');
                    return false;
                }
            };
            return true;
        },


        clone: function( params ){
            if(!this.checkRequired(STEPLIST_DEFAULT_OPTIONS.clone.required , params )){
                return;
            }

            return {
                params: angular.extend({} , STEPLIST_DEFAULT_OPTIONS.clone , params )
            }
        },


        checkout: function( params ){
            if(!this.checkRequired(STEPLIST_DEFAULT_OPTIONS.checkout.required , params )){
                return;
            }

            return {
                params: angular.extend({} , STEPLIST_DEFAULT_OPTIONS.checkout , params )
            }
        },


        gitInit: function( params ){
            if(!this.checkRequired(STEPLIST_DEFAULT_OPTIONS.gitInit.required , params )){
                return;
            }

            return {
                params: angular.extend({} , STEPLIST_DEFAULT_OPTIONS.gitInit , params )
            }
        },


        bulk: function( params ){
            if(!this.checkRequired(STEPLIST_DEFAULT_OPTIONS.bulk.required , params )){
                return;
            }

            return {
                params: angular.extend({} , STEPLIST_DEFAULT_OPTIONS.bulk , params ),
                start: function(){
                    var deferred = $q.defer();

                    this.params.listManager.on('end', function(){
                        deferred.resolve();
                    }).run();

                    return deferred.promise;
                },
            }
        },


        delete: function( params ){
            if(!this.checkRequired(STEPLIST_DEFAULT_OPTIONS.delete.required , params )){
                return;
            }

            return {
                params: angular.extend({} , STEPLIST_DEFAULT_OPTIONS.delete , params )
            }
        }

    }



    var StepListManagerEntity = function StepListManagerEntity( options ){
        var self = this;

        /**

            STATES:
            - empty
            - ready
            - running
            - done

         */

        var entityDeferred = $q.defer()

        self.steps      = [];
        self.state      = 'empty';
        self.options    = options;
        self.done       = entityDeferred;
    }

    StepListManagerEntity.prototype = {

        isActive: function( name , active ){
            for (var i = this.steps.length - 1; i >= 0; i--) {
                var aStep = this.steps[i];
                if(aStep.name === name ){
                    aStep.active = active;
                }
            };
            return this;
        },

        update: function( name , id , value ){
            for (var i = this.steps.length - 1; i >= 0; i--) {
                var aStep = this.steps[i];
                if(aStep.name === name ){
                    aStep.params[id] = value;
                }
            };
            return this;
        },

        on: function( event , callback ){
            if(event === 'end'){
                this.done.promise.then(callback);
            }

            return this;
        },

        add: function( name , type , params ){
            var theStepManager  = new StepManager( name ),
            theCompleteStep     = angular.extend({} , theStepManager[type](params) , {
                name: name,
                active: true
            });
            this.steps.push(theCompleteStep);
            if(this.state === 'empty'){
                this.state = 'ready';
            }
            return this;
        },

        run: function( params ){
            if(this.state !== 'ready'){
                console.error('Try to run step list when list not ready');
                return this;
            }

            var self = this;
            this.state = 'running';

            var genericPromiseCall = function ( options ){
                var deferredGenericPromise = $q.defer();

                $http[options.params.apiRequestType]( options.params.apiUrl , options.params ).then(function( req ){
                    if(!req.data.error) {
                        deferredGenericPromise.resolve({
                            result: req.data
                        });
                    } else {
                        deferredGenericPromise.reject({
                            error: options.error,
                            trace: req.data.error,
                            options: options
                        });
                    }
                });

                return deferredGenericPromise.promise;
            }

            var startStep = function ( index ){
                var aStep = self.steps[index],
                resultPromise;

                if( aStep && aStep.active ) {
                    aStep.state = 'running';

                    if(aStep.start){
                        resultPromise = aStep.start()
                    } else {
                        resultPromise = genericPromiseCall(aStep);
                    }
                    resultPromise.then(function(){
                        $timeout(function(){
                            aStep.state = 'done';
                            startStep( index + 1 );
                        }, 500 );
                    })
                } else {
                    self.done.resolve()
                    self.state = 'done';
                }
            }

            startStep(0);

            return this.done;
        }

    }




    var StepListManagerService = function StepListManagerService(){
        var self = this;

        self.allLists = {};

        return {
            createList: function( name , options ){
                if(self.allLists[name]){
                    console.error('List', name , 'already exist');
                    return;
                }

                var defaults =  {};
                options      = angular.extend({}, defaults, options || {});

                return new StepListManagerEntity( options );
            },
            getList: function( name , options ){
                if(self.allLists[name]){
                    console.error('List', name , 'does not exist');
                    return;
                }
                return self.allLists[name];
            }
        }
    }

    StepListManagerService.prototype = {



    }

    return new StepListManagerService()
}
