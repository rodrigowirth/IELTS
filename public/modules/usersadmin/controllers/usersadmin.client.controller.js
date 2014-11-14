'use strict';

angular.module('usersadmin').controller('UsersAdminController', ['$scope', '$stateParams', '$location', 'Authentication', 'UsersAdmin',
	function ($scope, $stateParams, $location, Authentication, UsersAdmin) {
	    $scope.authentication = Authentication;

	    $scope.find = function () {
	        $scope.users = UsersAdmin.query();
	    };	    
	}
]);