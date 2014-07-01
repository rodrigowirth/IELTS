'use strict';

angular.module('exams').filter('label', [
	function () {
	    return function (value) {
	        if (!value)
	            return 'label-default';

	        if (value <= 10)
	            return 'label-danger';
	        
	        if (value <= 20)
	            return 'label-warning';
	        
	        if (value <= 30)
	            return 'label-primary';
	        
	        if (value <= 40)
	            return 'label-success';
	        
	        return 'label-default';
	    };
	}
]);

angular.module('exams').filter('mark', [
	function () {
	    return function (value) {
	        if (!value)
	            return '-';
	        else
	            return value;
	    };
	}
]);

angular.module('exams').filter('finalmark', [
    function() {
        return function(exam) {
            var sum = exam.listening + exam.reading + exam.writing + exam.speaking;
            var avarage = sum * 9 / 160;
            return avarage.toFixed(1);
        };
    }
]);

angular.module('exams').filter('finalmarklabel', [
    function() {
        return function(exam) {
            var sum = exam.listening + exam.reading + exam.writing + exam.speaking;
            var avarage = sum * 9 / 160;

            if (avarage <= 3)
                return 'label-danger';

            if (avarage <= 5)
                return 'label-warning';

            if (avarage <= 7)
                return 'label-primary';

            if (avarage <= 9)
                return 'label-success';

            return 'label-default';
        };
    }
]);