'use strict';

//Editions service used for communicating with the articles REST endpoints
angular.module('exams').factory('Exams', ['$resource',
	function ($resource) {
	    return $resource('exams/:examId', {
	        examId: '@_id'
	    }, {
	        update: {
	            method: 'PUT'
	        }
	    });
	}
]);