'use strict';

angular.module('usersadmin').run(['Menus',
	function (Menus) {
	    // Set top bar menu items
	    Menus.addMenuItem('topbar', 'Users', 'usersadmin', 'dropdown', '/usersadmin', false);
	    Menus.addSubMenuItem('topbar', 'usersadmin', 'Manage', 'usersadmin', '', false);
	}
]);