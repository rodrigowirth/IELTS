﻿'use strict';

// Setting up route
angular.module('resume').config(['$stateProvider',
	function ($stateProvider) {
	    // Applicants state routing
	    $stateProvider.
		state('resume', {
		    url: '/resume',
		    templateUrl: 'modules/resume/views/resume.client.view.html'
		});
	}
]);