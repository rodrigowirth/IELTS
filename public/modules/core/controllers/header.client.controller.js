'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function ($scope, Authentication, Menus) {
	    $scope.authentication = Authentication;
	    $scope.isCollapsed = false;
	    $scope.menu = Menus.getMenu('topbar');

	    $scope.toggleCollapsibleMenu = function () {
	        $scope.isCollapsed = !$scope.isCollapsed;
	    };

	    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

	        if (!toState.role)
	            return;	        

	        if (Authentication.user.roles.indexOf(toState.role) >= 0)
	            return;	        

	        event.preventDefault();
	        // transitionTo() promise will be rejected with 
	        // a 'transition prevented' error
	    });

	    // Collapsing the menu after navigation
	    $scope.$on('$stateChangeSuccess', function () {
	        $scope.isCollapsed = false;
	    });
	}
]);