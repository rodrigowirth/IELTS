'use strict';

//Setting up route
angular.module('Reports').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.
        state('reportEditionAvg', {
            url: '/reports/editionavg',
            templateUrl: 'modules/reports/views/editionavg-reports.client.view.html'
        });
    }
]);