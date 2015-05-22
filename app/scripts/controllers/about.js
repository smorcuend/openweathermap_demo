'use strict';

/**
 * @ngdoc function
 * @name weatherPredictorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weatherPredictorApp
 */
angular.module('weatherPredictorApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
