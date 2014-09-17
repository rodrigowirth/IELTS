'use strict';

angular.module('Reports').controller('EvolutionReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Editions', 'Exams',
    function ($scope, $stateParams, $location, Authentication, Editions, Exams) {

        $scope.authentication = Authentication;
        
        $scope.load = function () {
            Editions.query(function (editions) {
                $scope.editions = editions;
                $scope.selectedEditions = clone($scope.editions);

                $scope.chartObject = {};

                $scope.chartObject.type = 'LineChart';
                $scope.chartObject.options = {
                    
                    vAxis: {
                        title: 'Points',
                        gridlines: {
                            count: 4
                        }
                    },
                    hAxis: {
                        title: 'Edition'
                    }
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

        function setData(data) {
            $scope.chartObject.data = {
                'cols': [
                    {
                        'id': 'edition',
                        'label': 'Edition',
                        'type': 'string',
                        'p': {}
                    },
                    {
                        'id': 'listening',
                        'label': 'Listening',
                        'type': 'number',
                        'p': {}
                    },
                    {
                        'id': 'reading',
                        'label': 'Reading',
                        'type': 'number',
                        'p': {}
                    },
                    {
                        'id': 'speaking',
                        'label': 'Speaking',
                        'type': 'number',
                        'p': {}
                    },
                    {
                        'id': 'writing',
                        'label': 'Writing',
                        'type': 'number'
                    }
                ],
                'rows': data
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
                    'c': [
                        {
                            'v': edition.title
                        },
                        {
                            'v': listening,
                        },
                        {
                            'v': reading,
                        },
                        {
                            'v': speaking,
                        },
                        {
                            'v': writing
                        }
                    ]
                });

                index = index + 1;
                loadExams(editions, index, data);
            });
        }

        function toDecimal(value) {
            return Math.round(value * 100) / 100;
        }

        function loadChart() {
            var data = [];
            var sortedEditions = $scope.selectedEditions.sort(compareEditions);

            if (sortedEditions.length > 0)
                loadExams(sortedEditions, 0, data);
        }

        function clone(obj) {
            // A clone of an object is an empty object 
            // with a prototype reference to the original.

            // a private constructor, used only by this one clone.

            function Clone() {
            }

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
    }
]);














