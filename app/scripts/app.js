'use strict';

/**
 * @ngdoc overview
 * @name cLifeAngularApp
 * @description
 * # cLifeAngularApp
 *
 * Main module of the application.
 */
angular
  .module('cLifeAngularApp', [
    'ngAnimate',
    'ngCookies',
    'EventsFactory',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-spinkit'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
