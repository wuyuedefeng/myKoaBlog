angular.module('myApp', [[
    '../css/postsNew.css',
    "../js/lib/marked/marked.min.js"
]])
    .controller('postsNewCtrl',['$scope', function($scope) {
        $scope.post = {};
    }]);