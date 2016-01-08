'use strict';


angular.module('wordpressGenerator' , [])
    .directive('wordpressGn', [ '$q' , '$http' , 'WPGEN_CONST' , 'wordpressGithubService' , 'wordpressApiService' , 'stepListManagerService' ,
        function ( $q , $http , WPGEN_CONST , wordpressGithubService , wordpressApiService , stepListManagerService ) {

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

                scope.allBranches      = null;
                scope.getAllBranches   = getAllBranches;
                scope.listManager      = stepListManagerService.createList('wordpress');

                scope.listManagerBulk  = stepListManagerService.createList('bulked');
                scope.listManagerBulk
                    .add( 'delete-first' , 'delete', {
                        path : scope.path + '/index.php',
                        description : 'Remove all default themes',
                    })
                    .add( 'delete-second' , 'delete', {
                        path : scope.path + '/license.txt',
                        description : 'Remove all default themes',
                    })

                console.info(scope.listManagerBulk);

                scope.options = {
                    gitInit: true,
                    removeDefaultThemes: true,
                    themeBoilerplate: true,
                };

                scope.gitInit          = true;
                scope.frontBoilerplate = true;


                scope.$watch('options.removeDefaultThemes', function( removeDefaultThemes ){
                    scope.listManager.isActive( 'delete-wordpress-default-themes' , removeDefaultThemes )
                });


                scope.$watch('listManager.state', function( gitInit , u ){
                    console.info(gitInit , u);
                });

                scope.$watch('options.gitInit', function( gitInit ){
                    scope.listManager.isActive( 'project-git-init' , gitInit )
                });


                scope.$watch('options.themeBoilerplate', function(frontBoilerplate){
                    scope.listManager.isActive( 'clone-boilerplate-theme' , frontBoilerplate )
                    scope.listManager.isActive( 'delete-boilerplate-git' , frontBoilerplate )
                });


                scope.$watch('branch', function( selectedBranch , previousBranch ){
                    if(selectedBranch ) {
                        if(!previousBranch ) {
                            createList();
                        }
                        scope.listManager.update( 'clone-wordpress' , 'branch' , selectedBranch);
                        scope.listManager.update( 'checkout-wordpress' , 'branch' , selectedBranch);
                        scope.listManager.update( 'checkout-wordpress' , 'description' , 'Checkout to branch ' + selectedBranch );
                    }
                });

                // scope.listManager.on('end', function(){
                //     console.info('DOne ll');
                // })


                /**
                 *
                 * PRIVATE
                 *
                 */

                function createList() {
                    scope.listManager
                        // .add( 'clone-wordpress' , 'clone', {
                        //     path        : scope.path,
                        //     url         : WPGEN_CONST.repository.wordpress,
                        //     notice      : WPGEN_CONST.repository.wordpress,
                        //     description : 'Wordpress from github repository',
                        // })
                        // .add( 'checkout-wordpress' ,'checkout', {
                        //     branch      : 'master',
                        //     path        : scope.path,
                        //     description : 'Checkout to branch master',
                        // })
                        // .add( 'delete-wordpress-git' , 'delete', {
                        //     path: scope.path + '/.git',
                        //     description : 'Remove the .git directory from root directory',
                        // })
                        // .add( 'delete-wordpress-default-themes' , 'delete', {
                        //     path : scope.path + '/wp-content/themes/twenty*',
                        //     description : 'Remove all default themes',
                        // })
                        // .add( 'clone-boilerplate-theme' , 'clone', {
                        //     branch      : 'theme',
                        //     description : 'Wordpress from github repository',
                        //     url         : WPGEN_CONST.repository.boilerplate,
                        //     notice      : WPGEN_CONST.repository.boilerplate,
                        //     path        : scope.path + '/wp-content/themes/' + scope.config.themeName,
                        // })
                        // .add( 'delete-boilerplate-git' , 'delete', {
                        //     path        : scope.path + '/wp-content/themes/' + scope.config.themeName + '/.git',
                        //     description : 'Remove the .git directory from root directory',
                        // })
                        // .add( 'project-git-init' , 'gitInit', {
                        //     path : scope.path,
                        // })
                        .add( 'project-bulk' , 'bulk', {
                            listManager : scope.listManagerBulk,
                        })
                }

                function getAllBranches() {
                    return wordpressGithubService.getAllBranches().then(listBranches);
                }

                function listBranches( request ) {
                    scope.allBranches = request.reverse();
                }
            }
        }
    }]);
