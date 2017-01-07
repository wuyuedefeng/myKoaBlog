angular.module('myApp', [{
    files: [
        '../css/postsShow.css',
    '../js/lib/marked/marked.min.js'
    ],
    cache: true
}])
    .controller('postsShowCtrl',['$scope', '$stateParams', '$timeout', function($scope, $stateParams, $timeout) {
        $scope._id = $stateParams.id;
        $scope.post = {};
        // $scope.$watch('$viewContentLoaded', function() {
        // });

        $scope._http.get({
            url: '/api/v1/posts/show',
            params: {
                _id: $stateParams.id
            },
            alwaysDo: function (isErr, data) {
                console.log(isErr, data);
                if (!isErr && data.post){
                    $scope.post = data.post;
                    $scope.post.html =  data.post.markdown;
                }
            }
        });
    }]);