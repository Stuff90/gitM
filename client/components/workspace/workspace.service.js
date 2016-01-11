'use strict';

angular.module('workspaceService', [])
    .service('workspaceService', [ 'localStorageManagerService' , 'ngDialog' , function( localStorageManagerService , ngDialog ) {

        var WorkspaceService = function WorkspaceService(){
            var self = this;
            self.init();

            return {
                get: function(){
                    return localStorageManagerService.get( 'workspace' );
                },
                reset: function(){
                    localStorageManagerService.remove('workspace');
                    return this;
                },
                update: function( path ){
                    localStorageManagerService.set( 'workspace' , path );
                    return this;
                }
            };
        }

        WorkspaceService.prototype = {

            init: function(){
                var self         = this,
                currentWorkspace = localStorageManagerService.get('workspace');

                if(!currentWorkspace) {
                    ngDialog.open({
                        showClose: false,
                        closeByEscape: false,
                        closeByDocument: false,
                        template: 'components/workspace/workspace.form.service.html',
                        controller: ['$scope' , '$state' , '$stateParams' , self.ngDialogController]
                    });
                }
            },

            ngDialogController: function( $scope , $state , $stateParams ){
                $scope.updateWorkspace = function( path ){
                    $scope.closeThisDialog();
                    localStorageManagerService.set( 'workspace' , path );
                    $state.transitionTo( $state.current , $stateParams , {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
            }

        }

        return new WorkspaceService();

    }]);
