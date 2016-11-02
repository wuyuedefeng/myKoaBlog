angular.module('myApp', [[
    '../css/postsShow.css',
    '../js/lib/marked/marked.min.js'
]])
    .controller('postsShowCtrl',['$scope', '$stateParams', function($scope, $stateParams) {
        $scope.post = {};
        // $scope.$watch('$viewContentLoaded', function() {
        //
        // });


        $scope._http.get({
            url: '/api/v1/posts/show',
            params: {
                _id: $stateParams.id
            },
            alwaysDo: function (isErr, data) {
                console.log(isErr, data);
                if (!isErr){
                    $('#markdown').html(marked(data.post.markdown));
                }
            }
        });
    }]);