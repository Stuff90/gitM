'use strict';

angular.module('gitMApp')
    .directive('file', [ '$compile' , function ($compile) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                file: '='
            },
            templateUrl: "/components/filetree/file.directive.template.html",

            link: function (scope, element, attrs) {

                scope.toggle = function(data){
                    data.open = !data.open;
                }

                if (angular.isArray(scope.file.children)) {
                    element.append("<filetree collapse='!file.open' root='file.children'></filetree>");
                    $compile(element.contents())(scope)
                }
            }
        }
    }]);