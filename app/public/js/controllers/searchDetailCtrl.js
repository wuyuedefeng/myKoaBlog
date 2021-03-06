angular.module('myApp', [[
    '../css/searchDetail.css'
]])
    .controller('searchDetailCtrl',['$scope', '$stateParams', function($scope, $stateParams) {
        $scope.searchDetail = {
            keywords: $stateParams.keywords
        };
        $scope._http.get({
            url: '/api/v1/posts',
            params: {
                keywords: $scope.searchDetail.keywords
            },
            alwaysDo: function (isErr, data) {
                console.log(isErr, data);
                if(!isErr){
                    $scope.posts = data.posts;

                    $scope.tagsObj = getPostsTags(data.posts);

                    console.log('tagsObj', $scope.tagsObj);

                }
            }
        });

        $scope.isShowPost = function (post) {
            var tags = post.tags;
            var tagsObj = $scope.tagsObj;
            var keys = [];
            tagsObj && Object.keys(tagsObj).forEach(function (tag) {
                if (tagsObj[tag]){
                    keys.push(tag);
                }
            });
            var contain = true;

            angular.forEach(keys, function (key) {
                if (tags.indexOf(key) == -1){
                    if (post.title && !post.title.match(key) || post.markdown && !post.markdown.match(key)){
                        contain = false;
                    }
                }
            });
            return contain;
        };


        function getPostsTags(posts) {
            var obj = {};
            var arr = [];
            angular.forEach(posts, function (post) {
                if (post.tags) {
                    arr = arr.concat(post.tags);
                }
            });
            angular.forEach(arr, function (tag) {
                obj[tag] = 0;
            });

            return obj;
        }

        $scope.search = function () {
            if($scope.searchDetail.keywords){
                $scope._state.go('searchDetail', {keywords: $scope.searchDetail.keywords});
            }else {
                $scope._state.go('search');
            }
        };

        $scope.login = function () {
            if($scope.user.name || $scope.user.username) {
                $scope._http.post({
                    url: 'api/v1/user/logout',
                    alwaysDo: function (isErr, data) {
                        if(!isErr){
                            location.reload();
                        }
                    }
                });
                return;
            }
            $scope._http.get({
                url: '/api/v1/user/githubClientId',
                alwaysDo: function (isErr, data) {
                    location.href = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=' + data.oauthClientId;
                }
            });
        }
    }]);