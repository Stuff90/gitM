'use strict';


angular.module('wordpressGenerator' , [])
    .directive('wordpressGn', [ '$compile' , '$http' , 'wordpressGnApiService' , function ( $compile , $http , wordpressGnApiService ) {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                path:'=',
                config:'=',
            },
            templateUrl: '/components/wordpressGenerator/wordpressGenerator.directive.template.html',
            link: function( scope , element , attrs ){

                /**
                 *
                 * PUBLIC
                 *
                 */

                scope.allBranchesPromise    = null;
                scope.ongoing               = false;
                scope.generate              = generate;
                scope.getAlBranches         = getAlBranches;

                scope.status = {
                    todo: {
                        clone: true,
                        checkout: true,
                        gitInit: true,
                    },
                    done: {
                        clone: false,
                        checkout: false,
                        gitInit: false,
                    }
                };

                scope.allBranches       = null;
                scope.config.git        = true;
                scope.config.path       = scope.path;
                scope.config.gitRepoUrl = 'https://github.com/WordPress/WordPress';

                scope.$watch('selectedBranch', function(selectedBranchValue){
                    scope.config.branch = selectedBranchValue;
                    console.info(scope.config);
                })


                /**
                 *
                 * PRIVATE
                 *
                 */

                function generate( config ) {
                    scope.ongoing = true;
                    scope.status.todo.clone = false;
                    $http.post('/api/project/new' , config ).then(function(e,r,t,y){
                        console.info(e,r,t,y);
                        scope.status.done.clone = true;
                    });
                }

                function getAlBranches() {
                    return wordpressGnApiService.getAllBranches().then(listBranches);
                }

                function listBranches( request ) {
                   scope.allBranches = request.reverse();
                }


                console.info('Wordpress gen directive');


            }
        }
    }]);
