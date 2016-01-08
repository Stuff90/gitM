'use strict';


angular.module('stepListModule')
    .constant('STEPLIST_DEFAULT_OPTIONS', {
        clone: {
            error: 'Error',
            title: 'Clone',
            branch: 'master',
            apiUrl: '/api/github',
            apiRequestType: 'post',
            notice: 'Git clone notice',
            required: [
                {
                    id:'url',
                    name:'Url',
                } , {
                    id:'path',
                    name:'Path',
                }],
            description: 'Git clone description',
        },
        checkout: {
            error: 'Error',
            branch: 'master',
            title: 'Checkout',
            apiUrl: '/api/github',
            apiRequestType: 'put',
            notice: 'Git checkout notice',
            required: [
                {
                    id:'branch',
                    name:'Branch',
                } , {
                    id:'path',
                    name:'Path',
                }],
            description: 'Git checkout description',
        },
        gitInit: {
            notice: '',
            error: 'Error',
            title: 'Git Init',
            apiUrl: '/api/git',
            apiRequestType: 'post',
            required: [
                {
                    id:'path',
                    name:'Path',
                } ],
            description: 'Initialisation of git',
        },
        bulk: {
            error: 'Error',
            title: 'Bulk action',
            required: [
                {
                    id:'listManager',
                    name:'List Manager',
                }],
            notice: 'Use bulk for generic actions throughout generators',
            description: 'Run another generator into the current one with the same context',
        },
        delete: {
            error: 'Error',
            title: 'Deletion',
            apiUrl: '/api/file',
            required: [
                {
                    id:'path',
                    name:'Path',
                }],
            apiRequestType: 'put',
            notice: 'File or directory will be completely remove',
            description: 'Delete description',
        }
    });
