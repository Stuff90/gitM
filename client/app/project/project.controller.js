'use strict';

angular.module('gitMApp')
    .controller('ProjectController',[ '$scope' , '$state' , '$stateParams' , 'ngDialog' , function ( $scope , $state, $stateParams , ngDialog ) {

        /**
         *
         * PUBLIC
         *
         */

        var defaultPath = '/Applications/MAMP/htdocs/trashDir/';

        $scope.path = '';
        $scope.genConfig = {};

        initProjectCreation( $stateParams.config );


        /**
         *
         * PRIVATE
         *
         */

        function initProjectCreation( configData ){
            if(configData === null) {

                configData = {
                    author: "theAuthor",
                    authorUrl: "http://theauthor.fr",
                    description: "the description",
                    generator: "Wordpress",
                    name: "theAppName",
                    themeName: "theThemeName",
                    themeVersion: "1.0.0",
                }

                // $state.go('index');

                // ngDialog.open({
                //     closeByDocument: false,
                //     template: 'app/modal/createProjectError.modal.html',
                //     controller: ['$scope' , '$state' , function( $scope ){
                //          $scope.error = 'Configuration data passed invalid';
                //     }]
                // });
                // return;
            }

            $scope.genConfig = configData;
            $scope.path      = defaultPath + configData.name;

        }

    }]);
