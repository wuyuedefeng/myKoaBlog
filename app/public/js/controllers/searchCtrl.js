angular.module('myApp', [[
    '../css/search.css'
]])
    .controller('searchCtrl',['$scope', function($scope) {
        $scope.test = 'search';
    }]);