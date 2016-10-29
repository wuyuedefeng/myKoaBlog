var directives = angular.module('directives', []);
directives.directive('afterRender', [ '$timeout', function($timeout) {
    return function(scope, element, attrs) {
        $timeout(function(){
            if(scope.$last) {
                if (attrs) {
                    scope.$eval(attrs.afterRender);
                }
            }
        });
    };
}]);