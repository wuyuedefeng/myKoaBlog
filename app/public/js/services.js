var services = angular.module('services', []);
//公共服务,处理网络请求异常或者程序异常等等情况
// params{result, status, headers, config, paramsObj}
services.factory("handleHttpError", function(){
    return {
        deal_app_error: function(params) {
            if (!params.result || params.result.code!=10000) {
                console.log(params.result || params.result.msg);
                params && params["paramsObj"] && (params["error_code"] = "app_error") && params["paramsObj"]["errorDo"] && params["paramsObj"]["errorDo"](params);
                return false;
            }
            return true;
        },
        deal_network_error: function(params){
            console.log("错误码:", params.status);
            params && params["paramsObj"] && (params["error_code"] = "network_error") && params["paramsObj"]["errorDo"] && params["paramsObj"]["errorDo"](params);
            return false;
        }
    }
});

// paramsObj {url: '/', params:{a:1, b:1}, successDo:function(handleResult), errorDo:(handleResult), alwaysDo:(isError, handleResult)}
services.factory('httpBase', ['$http', 'handleHttpError', function($http, handleHttpError){
    return{
        request: function(paramsObj){
            var requestObj = {method: paramsObj.method, url: paramsObj.url};
            if (paramsObj.method == "GET"){
                requestObj.params = paramsObj.params;
            }else {
                requestObj.data = paramsObj.params;
            }

            $http(requestObj).success(function(result,status,headers,config){
                var handleResult = {result: result,status: status,headers: headers,config:config, paramsObj:paramsObj};
                var isErr = true;
                if(handleHttpError.deal_app_error(handleResult)){
                    isErr = false;
                    paramsObj["successDo"] && paramsObj["successDo"](handleResult);
                }
                paramsObj["alwaysDo"] && paramsObj["alwaysDo"](isErr, handleResult.result  || {}, handleResult);
            }).error(function(result,status,headers,config){
                var handleResult = {result: result,status: status,headers: headers,config:config, paramsObj:paramsObj};
                handleHttpError.deal_network_error(handleResult);
                paramsObj["alwaysDo"] && paramsObj["alwaysDo"](true, handleResult.result || {}, handleResult);
            })
        },

        get: function(paramsObj){
            paramsObj.method = "GET";
            this.request(paramsObj);
        },

        post: function(paramsObj){
            paramsObj.method = "POST";
            paramsObj.transformRequest = function(data) {
                return $.param(data);
            };
            this.request(paramsObj);
        },
        put: function(paramsObj){
            paramsObj.method = "PUT";
            this.request(paramsObj);
        }
    }
}]);