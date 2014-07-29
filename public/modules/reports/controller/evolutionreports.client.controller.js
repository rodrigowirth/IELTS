'use strict';

angular.module('Reports').controller('EvolutionReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Editions', 'Exams',
	function ($scope, $stateParams, $location, Authentication, Editions, Exams) {
	    function setData(data) {	        
	        $scope.data = {
	            series: ['Listening', 'Reading', 'Speaking', 'Writing'],
	            data: data
	        };	        
	    }

	    function loadExams(editions, index, data) {
	        if (editions.length === index) {
	            setData(data);
	            return;
	        }

	        var edition = editions[index];
	                   

	        Exams.getByEdition({ id: edition._id }, function (exams) {
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

	            data.push({
	                'x': edition.title,
	                'y': [listening, reading, speaking, writing]
	            });

	            index = index + 1;
	            loadExams(editions, index, data);
	        });
	    }

	    function loadChart() {	        
	        var data = [];
	        var sortedEditions = $scope.selectedEditions.sort(compareEditions);	        

	        if (sortedEditions.length > 0)
	            loadExams(sortedEditions, 0, data);
	    }	    

	    function toDecimal(value) {
	        return Math.round(value * 100) / 100;
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

	    function compareEditions(a, b) {
	        if (a.date < b.date)
	            return -1;
	        if (a.date > b.date)
	            return 1;
	        return 0;
	    }
	    
	    $scope.authentication = Authentication;

	    $scope.load = function () {
	        Editions.query(function(editions) {
	            $scope.editions = editions;
	            
	            $scope.selectedEditions = clone($scope.editions);

	            $scope.chartType = 'line';

	            $scope.config = {
	                labels: false,
	                title: '',
	                legend: {
	                    display: false,
	                    position: 'right'
	                },
	                innerRadius: 0,
	                lineLegend: 'lineEnd',
	            };

	            loadChart();
	        });	        
	    };

	    $scope.isSelected = function (edition) {
	        return $scope.selectedEditions.indexOf(edition) > -1;
	    };

	    $scope.toggleEdition = function (edition) {
	        var index = $scope.selectedEditions.indexOf(edition);

	        if (index > -1)
	            $scope.selectedEditions.splice(index, 1);
	        else
	            $scope.selectedEditions.push(edition);

	        loadChart();
	    };	    
	}
]);