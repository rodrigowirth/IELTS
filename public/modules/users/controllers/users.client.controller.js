'use strict';

angular.module('users').controller('UsersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users',
	function ($scope, $stateParams, $location, Authentication, Users) {
	    $scope.authentication = Authentication;

	    $scope.find = function () {
	        $scope.users = Users.query();
	    };

	    $scope.setAsAdmin = function (id) {

	        Users.get({ userId: id }, function (user) {
	            if (user.roles.indexOf('admin') >= 0)
	                return;

	            user.roles.push('admin');
	            user.$update(function () { });
	        });
	    };
	}
]);