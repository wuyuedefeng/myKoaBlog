angular.module('myApp', [[
    '../css/postsShow.css',
    '../js/lib/marked/marked.min.js',
    '/highlight/src/styles/tomorrow-night-eighties.css',
    '/highlight/highlight.pack.js'
]])
    .controller('postsShowCtrl',['$scope', '$stateParams', '$timeout', function($scope, $stateParams, $timeout) {
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
                    $scope.post.html =  marked(data.post.markdown);
                    hljs.initHighlighting();
                }
            }
        });
    }]);