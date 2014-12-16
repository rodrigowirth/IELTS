'use strict';

// Configuring the Articles module
angular.module('editions').run(['Menus',
	function (Menus) {
	    // Set top bar menu items
	    Menus.addMenuItem('topbar', 'Editions', 'editions', 'dropdown', '/editions(/create)?', false, ['admin']);
	    Menus.addSubMenuItem('topbar', 'editions', 'List Editions', 'editions', '', false, ['admin']);
	    Menus.addSubMenuItem('topbar', 'editions', 'New Edition', 'editions/create', '', false, ['admin']);
	}
]);