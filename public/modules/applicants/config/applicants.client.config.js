'use strict';

// Configuring the Articles module
angular.module('applicants').run(['Menus',
	function (Menus) {
	    // Set top bar menu items
	    Menus.addMenuItem('topbar', 'Applicants', 'applicants', 'dropdown', '/applicants(/create)?', false, ['admin']);
	    Menus.addSubMenuItem('topbar', 'applicants', 'List Applicants', 'applicants', '', false, ['admin']);
	    Menus.addSubMenuItem('topbar', 'applicants', 'New Applicant', 'applicants/create', '', false, ['admin']);
	}
]);