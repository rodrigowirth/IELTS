'use strict';

angular.module('applicants').controller('ApplicantsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Applicants',
	function ($scope, $stateParams, $location, Authentication, Applicants) {
	    $scope.authentication = Authentication;

	    $scope.create = function () {
	        var applicant = new Applicants({
	            name: this.name,
	            email: this.email
	        });
	        applicant.$save(function (response) {
	            $location.path('applicants');
	        }, function (errorResponse) {
	            $scope.error = errorResponse.data.message;
	        });

	        this.title = '';
	        this.content = '';
	    };

	    $scope.remove = function (applicant) {
	        if (applicant) {
	            applicant.$remove();

	            for (var i in $scope.applicants) {
	                if ($scope.applicants[i] === applicant) {
	                    $scope.applicants.splice(i, 1);
	                }
	            }
	        } else {
	            $scope.applicant.$remove(function () {
	                $location.path('applicants');
	            });
	        }
	    };

	    $scope.update = function () {
	        var applicant = $scope.applicant;

	        applicant.$update(function () {
	            $location.path('applicants');
	        }, function (errorResponse) {
	            $scope.error = errorResponse.data.message;
	        });
	    };

	    $scope.find = function () {	        
	        $scope.applicants = Applicants.query();
	    };

	    $scope.findOne = function () {
	        $scope.applicant = Applicants.get({
	            applicantId: $stateParams.applicantId
	        });
	    };
	}
]);