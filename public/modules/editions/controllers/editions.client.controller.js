'use strict';

angular.module('editions').controller('EditionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Editions',
	function($scope, $stateParams, $location, Authentication, Editions) {
		$scope.authentication = Authentication;

		$scope.create = function () {
			console.log('passhere');
			var edition = new Editions({
				title: this.title,
				date: this.date
			});
			edition.$save(function(response) {
				$location.path('editions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.title = '';
		};
		
		$scope.remove = function (edition) {		    
			if (edition) {
				edition.$remove();

				for (var i in $scope.editions) {
					if ($scope.editions[i] === edition) {
						$scope.editions.splice(i, 1);
					}
				}
			} else {
				$scope.edition.$remove(function () {
					$location.path('editions');
				});
			}
		};
		
		$scope.update = function () {            
			var edition = $scope.edition;
			
			edition.$update(function () {
				$location.path('editions/' + edition._id);
			}, function (errorResponse) {                
				$scope.error = errorResponse.data.message;
			});
		};
		
		$scope.find = function () {            
			$scope.editions = Editions.query();
		};

		$scope.findOne = function () {            
			$scope.edition = Editions.get({
				editionId: $stateParams.editionId
			});            
		};
	}
]);