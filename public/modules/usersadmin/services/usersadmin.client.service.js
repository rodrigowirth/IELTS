'use strict';

//User admin service used for communicating with the articles REST endpoints
angular.module('usersadmin').factory('UsersAdmin', ['$resource',
	function ($resource) {
	    return $resource('usersadmin/:userId', {
	        userId: '@_id'
	    }, {
	        update: {
	            method: 'PUT'
	        }
	    });
	}
]);