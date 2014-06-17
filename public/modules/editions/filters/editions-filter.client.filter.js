'use strict';

angular.module('editions').filter('editionsFilter', [
	function () {
	    return function (input) {
	        // Articles filter directive logic
	        // ...

	        return 'editionsFilter filter: ' + input;
	    };
	}
]);