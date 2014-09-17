'use strict';

angular.module('Reports').controller('EditionAvgReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Editions', 'Exams',
	function ($scope, $stateParams, $location, Authentication, Editions, Exams) {

	    $scope.authentication = Authentication;

	    $scope.editionAvg = function () {
	        Editions.query(function(editions) {
	            $scope.editions = editions;
	            $scope.edition = editions[0];
	            
	            Exams.getByEdition({ id: $scope.edition._id }, function (exams) {
	                createReportData(exams);
	            });
	        });

	        $scope.chartObject = {};

	        $scope.chartObject.type = 'BarChart';
	        $scope.chartObject.options = {	            
	            'hAxis': {
	                'maxValue': 40,
	                'minValue': 0
	            }
	        };

	    };

	    $scope.editionChanged = function () {
	        Exams.getByEdition({ id: $scope.edition._id }, function (exams) {
	            createReportData(exams);
	        });
	    };

	    function createReportData(exams) {

	        var count = 0;
	        var listening = 0;
	        var reading = 0;
	        var speaking = 0;
	        var writing = 0;

	        for (var i = 0; i < exams.length; i++) {
	            count = count + 1;
	            if (exams[i].listening)
	                listening = listening + exams[i].listening;
	            if (exams[i].reading)
	                reading = reading + exams[i].reading;
	            if (exams[i].speaking)
	                speaking = speaking + exams[i].speaking;
	            if (exams[i].writing)
	                writing = writing + exams[i].writing;
	        }

	        if (count > 0) {
	            listening = toDecimal(listening / count);
	            reading = toDecimal(reading / count);
	            speaking = toDecimal(speaking / count);
	            writing = toDecimal(writing / count);
	        }

	        $scope.chartObject.data = {

	            'cols': [
                    { id: 't', label: 'Topping', type: 'string' },
                    { id: 's', label: 'Points', type: 'number' }
	            ],
	            'rows': [
                    {
                        c: [
                            { v: 'Listening' },
                            { v: listening },
                        ]
                    },

                    {
                        c: [
                            { v: 'Reading' },
                            { v: reading },
                        ]
                    },

                    {
                        c: [
                           { v: 'Speaking' },
                           { v: speaking }
                        ]
                    },

                    {
                        c: [
                           { v: 'Writing' },
                           { v: writing },
                        ]
                    }
	            ]
	        };

	    }

	    function toDecimal(value) {
	        return Math.round(value * 100) / 100;
	    }

	}
]);