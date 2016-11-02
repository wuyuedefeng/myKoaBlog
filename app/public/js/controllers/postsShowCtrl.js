angular.module('myApp', [[
    '../css/postsShow.css',
    '../js/lib/marked/marked.min.js',
    '../js/lib/angular-marked/angular-marked.min.js',
    '../js/lib/highlight/src/styles/tomorrow-night-eighties.css',
    '../js/lib/highlight/highlight.pack.js'
], 'hc.marked'])
    .config(['markedProvider', function (markedProvider) {
        markedProvider.setOptions({
            // gfm: true,
            // tables: true,
            highlight: function (code, lang) {
                if (lang) {
                    return hljs.highlight(lang, code, true).value;
                } else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });
    }])
    .controller('postsShowCtrl',['$scope', '$stateParams', 'marked', function($scope, $stateParams, marked) {
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
                if (!isErr){
                    $scope.post = data.post;
                    $scope.post.html =  marked(data.post.markdown);
                    hljs.initHighlightingOnLoad();
                }
            }
        });
    }]);