'use strict';

angular.module('usersadmin').controller('UsersAdminController', ['$scope', '$stateParams', '$location', 'Authentication', 'UsersAdmin',
	function ($scope, $stateParams, $location, Authentication, UsersAdmin) {
	    $scope.authentication = Authentication;

	    $scope.find = function () {
	        $scope.users = UsersAdmin.query();
	    };

	    $scope.setAsAdmin = function (id) {
	        UsersAdmin.get({ userId: id }, function (user) {
	            if (user.roles.indexOf('admin') >= 0)
	                return;

	            user.roles.push('admin');
	            user.$update(function () { });
	        });
	    };

	    $scope.setAsNotAdmin = function (id) {
	        UsersAdmin.get({ userId: id }, function (user) {
	            var index = user.roles.indexOf('admin');
	            if (index == -1)
	                return;
	            
	            user.roles.splice(index, 1);
	            user.$update(function () { });
	        });
	    };
	}
]);