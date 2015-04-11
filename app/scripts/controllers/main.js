'use strict';

/**
 * @ngdoc function
 * @name cLifeAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cLifeAngularApp
 */
angular.module('cLifeAngularApp')
.controller('MainCtrl',['eventsFactory', '$scope', '$location', '$anchorScroll', '$rootScope', function(eventsFactory, $scope, $location, $anchorScroll, $rootScope){
  
  // by default show all events happening today

  $scope.eventName = '';
  $scope.category_id = 0;
  $scope.time = 'today';
  $scope.time_to_display = 'today';

  $rootScope.showSettings = 1;

  eventsFactory.getEventByTimeAndCategory($scope.time, $scope.category_id)
    .success(function(data){
      $scope.allEvents = data;
    });
  
  eventsFactory.getEventCategories()
    .success(function(data){
      $scope.event_categories = data;
      var event_categories_options = [];
      var i;
      // hardocded for now :/
      event_categories_options.push({label: "All Events", value: 0});
      for (i in data){
        event_categories_options.push({label: data[i].category_name, value: data[i].id});
      }
      $scope.event_categories_options = event_categories_options;
      $scope.selected_event_category = event_categories_options[0];
  });

  eventsFactory.getUniversities()
    .success(function(data){
      $scope.universities = data;
      
      var universities_options = [];
      var i;

      universities_options.push({label: "All schools", value: 0});

      for (i in data){
        universities_options.push({label: data[i].name, value: data[i].id});
      }

      $scope.universities_options = universities_options;
      $scope.selected_university = universities_options[1];

  });

  $scope.getEventsByCategoryId = function(categoryId){

    $scope.category_id = categoryId;
    
    eventsFactory.getEventByTimeAndCategory($scope.time, $scope.category_id)
      .success(function(data){
        $scope.allEvents = data;
      });
  };

  $scope.showToday = function(){

    eventsFactory.getEventByTimeAndCategory('today', $scope.category_id)
      .success(function(data){
        $scope.allEvents = data;
      });

    $scope.time = 'today';
    $scope.time_to_display = 'today';
    $scope.eventName = '';
    
  };
  
  $scope.showThisWeek = function(){
    eventsFactory.getEventByTimeAndCategory('week', $scope.category_id)
      .success(function(data){
        $scope.allEvents = data;
      });

    $scope.time = 'week';
    $scope.time_to_display = 'this week';
    $scope.eventName = '';
  };

  $scope.showThisMonth = function(){
    eventsFactory.getEventByTimeAndCategory('month', $scope.category_id)
      .success(function(data){
        $scope.allEvents = data;
      });

    $scope.time = 'month';
    $scope.time_to_display = 'this month';
    $scope.eventName = '';
  };

  $scope.showLater = function(){
    
    eventsFactory.getEventByTimeAndCategory('later', $scope.category_id)
      .success(function(data){
        $scope.allEvents = data;
      });

    $scope.time = 'later';
    $scope.time_to_display = 'later';
    $scope.eventName = '';
  };

  $rootScope.goToTop = function(){
    console.log($location.hash('top'));
    $anchorScroll();
  };



  

}]); 

