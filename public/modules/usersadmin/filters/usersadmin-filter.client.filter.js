'use strict';

angular.module('usersadmin').filter('usersAdminFilter', [
	function () {
	    return function (input) {
	        // Articles filter directive logic
	        // ...

	        return 'editionsAdminFilter filter: ' + input;
	    };
	}
]);