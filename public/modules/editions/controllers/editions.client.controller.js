'use strict';

angular.module('editions').controller('EditionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Editions',
	function ($scope, $stateParams, $location, Authentication, Editions) {
	    $scope.authentication = Authentication;

	    $scope.create = function () {

	        var edition = new Editions({
	            title: this.title,
	            date: this.date
	        });

	        edition.$save(function (response) {
	            $location.path('editions');
	        }, function (errorResponse) {
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
	            $location.path('editions');
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

	    $scope.find2 = function () {
	        $scope.data = {
	            series: ['Sales', 'Income', 'Expense'],
	            data: [{
	                x: 'Jack',
	                y: [100, 210, 384],
	                tooltip: 'this is tooltip'
	            },
	                {
	                    x: 'John',
	                    y: [300, 289, 456]
	                },
	                {
	                    x: 'Stacy',
	                    y: [351, 170, 255]
	                },
	                {
	                    x: 'Luke',
	                    y: [54, 341, 879]
	                }]
	        };

	        $scope.chartType = 'bar';

	        $scope.sampledata = {
	            x: 'Computers',
	            y: [54, 0, 879],
	            tooltip: 'This is a tooltip'
	        };

	        $scope.combinedsample = {
	            series: ['Sales', 'Income', 'Expense'],
	            data: [{
	                x: 'Computers',
	                y: [54, 0, 879],
	                tooltip: 'This is a tooltip'
	            }]
	        };

	        $scope.messages = [];

	      

	        $scope.config = {
	            labels: false,
	            title: 'Products',
	            legend: {
	                display: true,
	                position: 'right'
	            },
	            click: function (d) {
	                $scope.messages.push('clicked!');
	            },
	            mouseover: function (d) {
	                $scope.messages.push('mouseover!');
	            },
	            mouseout: function (d) {
	                $scope.messages.push('mouseout!');
	            },
	            innerRadius: 0,
	            lineLegend: 'lineEnd',
	        };
	    };
	}
]);