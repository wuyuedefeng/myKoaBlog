angular.module('myApp', [[
    '../css/search.css'
]])
.controller('searchCtrl',['$scope', function($scope) {
    $scope.search = {};

    $scope.search = function () {
        var keywords = $scope.search.keywords;
        if (keywords){
            $scope._state.go('searchDetail', {keywords: keywords});
        }
    }
}]);