'use strict';

angular.module('exams').controller('ExamsController', ['$scope', '$stateParams', '$location', '$timeout', 'Authentication', 'Exams', 'Applicants', 'ApplicantsForExam', 'Editions',
	function ($scope, $stateParams, $location, $timeout, Authentication, Exams, Applicants, ApplicantsForExam, Editions) {
	    $scope.authentication = Authentication;

	    $scope.create = function () {
	        $scope.message = null;
	        $scope.error = null;

	        var e = $scope.exam;

	        if (!e) {
	            $scope.error = 'You have to set the data!';
	            return;
	        }

	        if (!e.applicant) {
	            $scope.error = 'You have to select an Applicant!';
	            return;
	        }

	        var exam = new Exams(
	        {
	            edition: $stateParams.editionId,
	            applicant: e.applicant._id,
	            listening: e.listening,
	            reading: e.reading,
	            speaking: e.speaking,
	            writing: e.writing
	        });

	        exam.$save(function (response) {
	            loadData();
	            $scope.exam = null;
	            $scope.exams.push(exam);
	            showMessage('Exam saved');
	        }, function (errorResponse) {
	            $scope.error = errorResponse;
	        });
	    };

	    $scope.load = function() {
	        loadData();
	    };

	    $scope.remove = function (exam) {
	        if (exam) {
	            exam.$remove();

	            $scope.applicants.push(exam.applicant);

	            for (var i in $scope.exams) {
	                if ($scope.exams[i] === exam) {
	                    $scope.exams.splice(i, 1);
	                }
	            }
	        } else {
	            $scope.exam.$remove(function () {
	            });
	        }
	    };

	    $scope.edit = function (exam) {
	        $scope.editing = true;
	        $scope.exam = clone(exam);
	        $scope.applicants.push(exam.applicant);
	    };

	    $scope.update = function () {
	        var exam = $scope.exam;

	        exam.$update(function () {
	            $scope.editing = false;
	            $scope.exam = null;
	            $scope.applicants.pop();

	            loadExams();
	            showMessage('Exam updated');
	        }, function (errorResponse) {
	            $scope.error = errorResponse;
	        });
	    };

	    $scope.cancel = function () {
	        $scope.applicants.pop();	        
	        $scope.exam = null;
	        $scope.editing = false;
	    };

	    function showMessage(message) {
	        $scope.message = message;

	        $timeout(function () {
	            $scope.message = null;
	        }, 1500);
	    }

	    function loadData() {            
	        ApplicantsForExam.query({id: $stateParams.editionId}, function (applicants) {
	            $scope.applicants = applicants;
	        });

	        $scope.edition = Editions.get({
	            editionId: $stateParams.editionId
	        });

	        loadExams();
	    }
	    
	    function loadExams() {
	        Exams.getByEdition({ id: $stateParams.editionId }, function (exams) {
	            $scope.exams = exams;
	            //console.log(exams);
	        });
	    }

	    function clone(obj) {
	        // A clone of an object is an empty object 
	        // with a prototype reference to the original.

	        // a private constructor, used only by this one clone.
	        function Clone() { }
	        Clone.prototype = obj;
	        var c = new Clone();
	        c.constructor = Clone;
	        return c;
	    }	
	}
]);