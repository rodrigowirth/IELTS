'use strict';

//Editions service used for communicating with the articles REST endpoints
angular.module('editions').factory('Editions', ['$resource',
	function ($resource) {	    
		return $resource('editions/:editionId', {
			editionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);