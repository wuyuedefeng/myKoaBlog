var filters = angular.module('filters', []);

// filters.filter('toTrusted', ['$sce', function ($sce){
//         return function (text) {
//             return $sce.trustAsHtml(text);
//         }
// }]);

// filters.filter('markdownLimitLength', function (){
//     return function (oriVal) {
//         // var handleVal = oriVal.replace(new RegExp('[^0-9a-zA-Z,"()[]_;\u4e00-\u9fa5]', 'g'), '');
//         if (oriVal && oriVal.length > 300){
//             return oriVal.substr(0,300);
//         }
//         return oriVal || "";
//     }
// });

filters.filter('ObjKeys', function (){
    return function (obj) {
        return Object.keys(obj);
    }
});

filters.filter('keywords', function (){
        return function (oriVal, keywords) {
            console.log(oriVal)
            if (oriVal && keywords){
                var subArr = [];
                keywords.split(' ').forEach(function (value) {
                    subArr.push('('+value+')');
                });
                return oriVal.replace(new RegExp(subArr.join('|'), "g"), function (key) {
                   return '<span class="red">' + key + '</span>';
                })
            }
            return oriVal;
        }
});
