'use strict';


angular.module('gitMApp')
    .directive('filetree', function () {
        return {
            restrict: "E",
            replace: true,
            scope: {
                root: '='
            },
            template: "<ul class='node--parent'><file ng-repeat='file in root' file='file'></file></ul>"
        }
    });