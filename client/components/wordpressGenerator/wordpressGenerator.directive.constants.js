'use strict';


angular.module('wordpressGenerator')
    .constant('WPGEN_CONST', {
        repository: {
            wordpress: 'https://github.com/WordPress/WordPress',
            boilerplate: 'https://github.com/Stuff90/wp-boilerplate',
        },
        api: {
            branches: 'https://api.github.com/repos/WordPress/WordPress/branches'
        }
    });
