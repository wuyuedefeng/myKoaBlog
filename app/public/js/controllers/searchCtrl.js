angular.module('myApp', [[
    '../css/search.css'
]])
.controller('searchCtrl',['$scope', function($scope) {
    $scope.search = {};

    $scope.$watch('$viewContentLoaded', function() {
        $('.search-input').focus();
    });

    $scope.search = function () {
        var keywords = $scope.search.keywords;
        if (keywords){
            $scope._state.go('searchDetail', {keywords: keywords});
        }
    }
}]);