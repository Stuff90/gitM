'use strict';

angular.module('gitMApp')
    .controller('MenuController',[ '$scope' , '$state' , 'ngDialog' , function ( $scope , $state , ngDialog ) {

        /**
         *
         * PUBLIC
         *
         */

        $scope.open = false;
        $scope.newProject = newProjectModal;



        /**
         *
         * PRIVATE
         *
         */


        function newProjectModal() {
            ngDialog.open({
                closeByDocument: false,
                template: 'app/modal/createProjectForm.modal.html',
                controller: ['$scope' , '$state' , newProjectDialogController ]
            });
        }




        function newProjectDialogController( $scope , $state) {
            $scope.validateProjectCreation = validateProjectCreation;

            $scope.generators = [
                { name: 'Wordpress'},
                { name: 'Blank'},
            ];

            $scope.project = {
                generator: 'Wordpress',
                themeVersion: '1.0.0',

                name: 'theAppName',
                themeName: 'theThemeName',
                author: 'theAuthor',
                authorUrl: 'http://theauthor.fr',
                description: 'the description',
            }


            function validateProjectCreation(projectConfig) {
                $scope.closeThisDialog();
                $state.go('project:new' , { config: projectConfig });
            }
        }


    }]);
