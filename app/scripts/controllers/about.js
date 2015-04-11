'use strict';

/**
 * @ngdoc function
 * @name cLifeAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cLifeAngularApp
 */
angular.module('cLifeAngularApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
