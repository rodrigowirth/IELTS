'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function ($stateProvider) {
	    // Users state routing
	    $stateProvider.
	    state('listUsers', {
	        url: '/users',
	        templateUrl: 'modules/users/views/list-users.client.view.html',
	        role: 'admin'
	    }).
		state('profile', {
		    url: '/settings/profile',
		    templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
		    url: '/settings/password',
		    templateUrl: 'modules/users/views/settings/change-password.client.view.html',
		    role: 'admin'
		});
	}
]);