'use strict';

//Setting up route
angular.module('exams').config(['$stateProvider',
    function ($stateProvider) {        
        $stateProvider.
        state('editionExams', {
            url: '/exams/:editionId/edition',
            templateUrl: 'modules/exams/views/edition-exams.client.view.html'
        });        
    }
]);