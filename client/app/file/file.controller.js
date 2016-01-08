'use strict';

angular.module('gitMApp')
    .controller('FileController',[ '$scope', '$http' , 'socket' , 'FileService' , function ($scope, $http , socket , FileService ) {

        /**
         *
         * PUBLIC
         *
         */

        $scope.fileDisplayed = false;

        FileService.onFileFocus().then( updateFocusFile );


        /**
         *
         * PRIVATE
         *
         */


        function updateFocusFile ( theFile ) {
            console.info(theFile);
            $scope.file          = theFile;
            $scope.fileDisplayed = true;
        }

    }]);
