'use strict';

angular.module('articles').filter('articlesFilter', [
	function() {
		return function(input) {
			// Articles filter directive logic
			// ...

			return 'articlesFilter filter: ' + input;
		};
	}
]);