'use strict';

angular.module('Reports').controller('LearnerForAdminReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Editions', 'Exams', 'Applicants',
    function ($scope, $stateParams, $location, Authentication, Editions, Exams, Applicants) {

        $scope.authentication = Authentication;

        $scope.load = function () {
            setupChart();

            Applicants.query({}, function (applicants) {
                $scope.applicants = applicants;
            });

            if (applicants.lenght > 0)
                $scope.applicant = applicants[0];

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

        $scope.applicantChanged = function (applicant) {
            Exams.getByApplicant({ id: applicant._id }, function (exams) {
                $scope.exams = exams;

                loadEditions();
                loadChart();

            });
        };

        function loadEditions() {
            var editions = [];
            var exams = $scope.exams;

            for (var i = 0; i < exams.length; i++) {
                exams[i].edition.applicantExam = exams[i];
                editions.push(exams[i].edition);
            }

            $scope.editions = editions;
            $scope.selectedEditions = clone($scope.editions);
        }

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

        function loadExams(editions) {
            var data = [];
            var exams = $scope.exams;

            for (var i = 0; i < editions.length; i++) {
                var edition = editions[i];
                
                for (var j = 0; j < exams.length; j++) {
                    var exam = exams[j];

                    if (exam.edition._id === edition._id) {

                        data.push({
                            'c': [
                                {
                                    'v': edition.title
                                },
                                {
                                    'v': exam.listening,
                                },
                                {
                                    'v': exam.reading,
                                },
                                {
                                    'v': exam.speaking,
                                },
                                {
                                    'v': exam.writing
                                }
                            ]
                        });

                    }
                }
            }

            setData(data);

        }

        function loadChart() {
            var sortedEditions = $scope.selectedEditions.sort(compareEditions);

            if (sortedEditions.length > 0)
                loadExams(sortedEditions);
        }

        function setupChart() {
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
            if (!a || !b)
                return 0;

            if (a.date < b.date)
                return -1;
            if (a.date > b.date)
                return 1;
            return 0;
        }
               
    }
]);