'use strict';


angular.module('gitMApp')
    .directive('filetree', [ '$compile' , 'FileService' , function ( $compile , FileService ) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '=',
                root: '=',
                expanded: '=',
            },
            templateUrl: '/components/filetree/filetree.directive.template.html',
            link: function( scope , element , attrs ){

                /**
                 *
                 * PUBLIC
                 *
                 */


                scope.haveChildren   = false;
                scope.selectFile     = selectFile;
                scope.toggleChildren = toggleChildren;

                scope.$watch('data', updateTree );

                /**
                 *
                 * PRIVATE
                 *
                 */

                function selectFile( filePath ) {
                    FileService.focus(scope.filePath);
                }

                function toggleChildren() {
                    scope.isExpanded = !scope.isExpanded;
                }

                function updateTree( newTree ) {
                    scope.name        = newTree.name;
                    scope.isExpanded  = !!scope.expanded;
                    scope.isDirectory = newTree.type == 'directory';

                    if( newTree.path === '' ){
                        scope.filePath = scope.root;
                    } else {
                        scope.filePath = scope.root + scope.name;
                    }

                    if(newTree.children && newTree.children.length > 0) {
                        scope.childRoot = newTree.path;
                        scope.children  = newTree.children;

                        $compile( '<filetree ng-repeat="child in children | orderBy:\'type\'" root="filePath" expanded="0" data="child"></filetree>' ) ( scope.$new() , function( $filetree ){
                            element.append($filetree);
                        })
                    } else {
                    }
                }


            }
        }
    }]);
