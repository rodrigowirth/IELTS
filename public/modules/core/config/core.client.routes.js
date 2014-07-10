'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
	    // Redirect to home view when route not found
	    $urlRouterProvider.otherwise('/');

	    // Home state routing
	    $stateProvider.
		state('home', {
		    url: '/',
		    templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);

angular.module('core').run(function ($rootScope, $location, $state, Authentication) {
    $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
        
        if ($location.url() === '/')
            return;
        
        if ($location.url() === '/signin')
            return;               

        if (!Authentication.user) {
            $state.transitionTo('home');
            ev.preventDefault();
        }
        
    });
});