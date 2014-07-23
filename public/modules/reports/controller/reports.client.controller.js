'use strict';

angular.module('Reports').controller('ReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Editions', 'Exams',
	function ($scope, $stateParams, $location, Authentication, Editions, Exams) {
	    $scope.authentication = Authentication;

	    $scope.editionAvg = function () {
	        $scope.editions = Editions.query();

	        //lastEdition	        	        

	        $scope.chartType = 'bar';

	        $scope.config = {
	            labels: false,
	            title: 'Products',
	            legend: {
	                display: false,
	                position: 'right'
	            },
	            click: function (d) {

	            },
	            mouseover: function (d) {

	            },
	            mouseout: function (d) {

	            },
	            innerRadius: 0,
	            lineLegend: 'lineEnd',
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
	        
	        $scope.data = {	            
	            data: [
                    {
                        x: 'Listening',
                        y: [listening]
                    },
                    {
                        x: 'Reading',
                        y: [reading]
                    },
                    {
                        x: 'Speaking',
                        y: [speaking]
                    },
                    {
                        x: 'Writing',
                        y: [writing]
                    }]
	        };
	    }
	    
	    function toDecimal(value) {
	        return Math.round(value * 100) / 100;
	    }
	}
]);