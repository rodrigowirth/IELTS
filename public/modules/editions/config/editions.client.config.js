'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function (Menus) {
	    // Set top bar menu items
	    Menus.addMenuItem('topbar', 'Editions', 'editions', 'dropdown', '/editions(/create)?');
	    Menus.addSubMenuItem('topbar', 'editions', 'List Editions', 'editions');
	    Menus.addSubMenuItem('topbar', 'editions', 'New Edition', 'editions/create');
	}
]);