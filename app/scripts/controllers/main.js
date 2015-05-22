'use strict';

/**
 * @ngdoc function
 * @name weatherPredictorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherPredictorApp
 */
angular.module('weatherPredictorApp')
    .controller('MainCtrl', function($scope, $q, OpenWeatherMapApi, $localStorage) {
        $scope.city = '';

        $scope.searchCity = function() {

            if ($localStorage[$scope.city] && $localStorage[$scope.city].expire > (new Date().getTime())) {
                return $scope.loadData($scope.city);
            }

            OpenWeatherMapApi.getCityDailyWeather($scope.city).then(function(response) {
                if (+response.data.cod === 200) {
                    $scope.currentData = true;
                    $scope.currentCityWF = response.data;
                } else if (response.data.cod === 404) {
                    $scope.currentData = false;
                    $scope.cityWF = response.data.message;
                }
            });
            var daysEstimation = 5;
            OpenWeatherMapApi.getCityWeatherForecast($scope.city, daysEstimation).then(function(response) {
                if (+response.data.cod === 200) {
                    $scope.currentDataNextF = true;
                    $scope.nextWF = response.data;
                    $scope.generateGraph();
                } else if (response.data.cod === 404) {
                    $scope.currentDataNextF = false;
                    $scope.nextWF = response.data.message;
                }
            });

            if ($scope.currentData && $scope.currentDataNextF) {
                $scope.saveData($scope.city);
            }

        };

        $scope.generateGraph = function() {

            var maxTemps = [],
                minTemps = [],
                dayList = [];

            $scope.nextWF.list.forEach(function(element) {
                maxTemps.push(element.temp.max);
                minTemps.push(element.temp.min);
                dayList.push(element.dt);
            });

            $scope.config = {
                title: 'Temperature',
                tooltips: true,
                labels: false,
                mouseover: function() {},
                mouseout: function() {},
                click: function() {},
                legend: {
                    display: true,
                    //could be 'left, right'
                    position: 'right'
                }
            };

            $scope.data = {
                series: ['max'],
                data: [{
                    x: '1',
                    y: [100],
                }]
            };

        };

        $scope.loadData = function(currentCity) {
            $scope.currentCityWF = $localStorage[currentCity].daily;
            $scope.nextWF = $localStorage[currentCity].weekly;
            $scope.generateGraph();
        };

        $scope.saveData = function(newCity) {
            $localStorage[newCity] = {};
            $localStorage[newCity].daily = $scope.currentCityWF;
            $localStorage[newCity].weekly = $scope.nextWF;
            $localStorage[newCity].expire = new Date().getTime() + 360000;
        };

    });
