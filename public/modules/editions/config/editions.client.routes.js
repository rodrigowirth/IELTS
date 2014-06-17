'use strict';

//Setting up route
angular.module('editions').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.
        state('listEditions', {
            url: '/editions',
            templateUrl: 'modules/editions/views/list-editions.client.view.html'
        }).
        state('createEdition', {
            url: '/editions/create',
            templateUrl: 'modules/editions/views/create-edition.client.view.html'
        }).
		state('viewEdition', {
		    url: '/editions/:editionId',
		    templateUrl: 'modules/editions/views/view-edition.client.view.html'
		}).
        state('deleteEdition', {
            url: '/editions/:editionId/delete',
            templateUrl: 'modules/editions/views/delete-edition.client.view.html'
        }).
		state('editEdition', {
		    url: '/editions/:editionId/edit',
		    templateUrl: 'modules/editions/views/edit-edition.client.view.html'
		});
    }
]);