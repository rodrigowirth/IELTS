'use strict';

//Applicants service used for communicating with the articles REST endpoints
angular.module('applicants').factory('Applicants', ['$resource',
	function ($resource) {
	    return $resource('applicants/:applicantId', {
	        applicantId: '@_id'
	    }, {
	        update: {
	            method: 'PUT'
	        },
	        getByEmail: {
	            url: 'applicants/email/:email',
	            method: 'GET',
	            isArray: false
	        }
	    });
	}
]);

angular.module('applicants').factory('ApplicantsForExam', ['$resource',
	function ($resource) {
	    return $resource('applicants/edition/:id');
	}
]);