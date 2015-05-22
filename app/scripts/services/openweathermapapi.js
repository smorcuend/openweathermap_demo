'use strict';

/**
 * @ngdoc service
 * @name weatherPredictorApp.openWeatherMapApi
 * @description
 * # openWeatherMapApi
 * Service in the weatherPredictorApp.
 */
angular.module('weatherPredictorApp')
    .service('OpenWeatherMapApi', function($http) {

        var API = {};

        var _endPoint = 'http://api.openweathermap.org/data/2.5/';

        API.getCityDailyWeather = function(city) {
            var params = {
                q: city || '',
                mode: 'json',
                units: 'metric'
            };
            return $http({
                method: 'GET',
                url: _endPoint + 'weather',
                params: params
            });
        };
        API.getCityWeatherForecast = function(city, days) {
            var params = {
                q: city || '',
                cnt: days || 0,
                mode: 'json',
                units: 'metric'
            };
            return $http({
                method: 'GET',
                url: _endPoint + 'forecast/daily',
                params: params
            });
        };



        // function _getList(queryParams) {
        //     return $http({
        //         method: 'GET',
        //         url: envData.config.resourcesEndpoint + 'resource/bitbloq:Project',
        //         params: queryParams
        //     });
        // }

        // function getAll(queryParams, resultArray, promise) {
        //     var defered = promise || $q.defer();

        //     _getList(queryParams).then(function(response) {
        //         resultArray = resultArray.concat(response.data);
        //         if (response.data.length === queryParams['api:pageSize']) {
        //             queryParams['api:page']++;
        //             getAll(queryParams, resultArray, defered);
        //         } else {
        //             defered.resolve(resultArray);
        //         }
        //     }, function(error) {
        //         defered.reject(error.data);
        //     });

        //     return defered.promise;
        // }

        // data.get = function(id) {
        //     return $http.get(envData.config.resourcesEndpoint + 'resource/bitbloq:Project/' + id);
        // };

        // data.getMyProjects = function(queryParams) {
        //     var myProjectArray = [],
        //         params = {
        //             'api:query': [{
        //                 '$eq': {
        //                     userId: $localStorage.userId
        //                 }
        //             }],
        //             'api:sort': {
        //                 'createdAt': 'desc'
        //             },
        //             'api:page': 0,
        //             'api:pageSize': 50
        //         };
        //     queryParams = queryParams || {};
        //     angular.extend(params, queryParams);

        //     return getAll(params, myProjectArray);
        // };

        // data.getPublic = function(queryParams) {

        //     var params = {
        //         'api:query': [{
        //             '$eq': {
        //                 '_acl.ALL': 'READ'
        //             }
        //         }],
        //         'api:sort': {
        //             'createdAt': 'desc'
        //         },
        //         'api:pageSize': 18
        //     };
        //     queryParams = queryParams || {};
        //     angular.extend(params, queryParams);

        //     return _getList(params);
        // };

        return API;
    });
