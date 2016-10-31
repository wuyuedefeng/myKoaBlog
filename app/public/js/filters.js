var filters = angular.module('filters', []);

// filters.filter('toTrusted', ['$sce', function ($sce){
//         return function (text) {
//             return $sce.trustAsHtml(text);
//         }
// }]);

filters.filter('keywords', function (){
        return function (oriVal, keywords) {
            if (keywords){
                return oriVal.replace(keywords, function (keywords) {
                   return '<span class="red">' + keywords + '</span>';
                })
            }
            return '';
        }
});
