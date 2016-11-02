angular.module('myApp', [[
    '../css/postsShow.css',
    '../js/lib/marked/marked.min.js',
    '../js/lib/angular-marked/angular-marked.min.js',
    '../js/lib/highlight/src/styles/darkula.css',
    '../js/lib/highlight/src/highlight.js'
], 'hc.marked'])
    .config(['markedProvider', function (markedProvider) {
        markedProvider.setOptions({
            gfm: true,
            tables: true,
            highlight: function (code, lang) {
                console.log('highlight', code, lang);
                if (lang) {
                    return hljs.highlight(lang, code, true).value;
                } else {
                    return hljs.highlightAuto(code).value;
                }
            }
        });
    }])
    .controller('postsShowCtrl',['$scope', '$stateParams', function($scope, $stateParams) {
        $scope.post = {};
        $scope.$watch('$viewContentLoaded', function() {
            console.log('rendered');
            setTimeout(function () {
                hljs.initHighlightingOnLoad();
            }, 1000);

        });


        $scope._http.get({
            url: '/api/v1/posts/show',
            params: {
                _id: $stateParams.id
            },
            alwaysDo: function (isErr, data) {
                console.log(isErr, data);
                if (!isErr){
                    $scope.post = data.post;
                    console.log('markdown');
                    $('#markdown').html(marked(data.post.markdown));
                }
            }
        });
    }]);