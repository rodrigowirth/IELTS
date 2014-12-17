'use strict';

//Setting up route
angular.module('Reports').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.
        state('reportEditionAvg', {
            url: '/reports/editionavg',
            templateUrl: 'modules/reports/views/editionavg-reports.client.view.html'
        }).
        state('reportEvolution', {
            url: '/reports/evolution',
            templateUrl: 'modules/reports/views/evolution-reports.client.view.html'
        }).
        state('reportLearnerEvolution', {
            url: '/reports/myevolution',
            templateUrl: 'modules/reports/views/learnerevolution-reports.client.view.html'
        }).
        state('reportLearnerForAdmin', {
            url: '/reports/applicants',
            templateUrl: 'modules/reports/views/learnerforadmin-reports.client.view.html'
        });
    }
]);