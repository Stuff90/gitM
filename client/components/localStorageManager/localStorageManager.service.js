'use strict';

angular.module('localStorageManager', [])
    .service('localStorageManagerService', [ 'ngDialog' , '$timeout' , '$state' , 'localStorageService' , function( ngDialog , $timeout , $state , localStorageService ) {

        var LocalStorageManagerService = function LocalStorageManagerService(){
            var self = this;

            if(!localStorageService.isSupported) {
                self.raiseError();
                $state.go('index');
            }


            return localStorageService;

        }

        LocalStorageManagerService.prototype = {

            raiseError: function(){
                ngDialog.open({
                    closeByDocument: false,
                    template: 'components/localStorageManager/localStorageManager.error.service.html',
                    controller: ['$scope' , function(){}]
                });
            }

        }

        return new LocalStorageManagerService();

    }]);
