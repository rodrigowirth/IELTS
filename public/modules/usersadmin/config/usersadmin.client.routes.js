'use strict';

//Setting up route
angular.module('usersadmin').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.
		state('listUsersadmin', {
		    url: '/usersadmin',
		    templateUrl: 'modules/usersadmin/views/list-usersadmin.client.view.html'
		});
    }
]);