'use strict';

angular.module('Reports').filter('finalmark', [
    function () {
        return function (exam) {
            var sum = exam.listening + exam.reading + exam.writing + exam.speaking;
            var avarage = sum * 9 / 160;
            return avarage.toFixed(1);
        };
    }
]);