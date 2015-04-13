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
  
  // populate timeframe dropdown
  var times = [];
  times.push({value: 'today', label: 'Today'});
  times.push({value: 'week', label: 'This Week'});
  times.push({value: 'month', label: 'This Month'});
  times.push({value: 'later', label: 'Later'});

  $scope.timeDropdown = times;
  
  $scope.selectedTime = times[0];
  $scope.timeToDisplay = $scope.selectedTime.label;
  $scope.timeValue = $scope.selectedTime.value;

  eventsFactory.getEventCategories()
    .success(function(data){
      $scope.event_categories = data;
      var event_categories_options = [];
      var i;
     

      for (i in data){
        event_categories_options.push({label: data[i].category_name, value: data[i].id});
      }

      event_categories_options.push({label: 'All Events', value: 0});
      
      $scope.event_categories_options = event_categories_options;
      
      $scope.selectedCategory = event_categories_options[0];
      $scope.categoryValue = $scope.selectedCategory.value;
      $scope.categoryToDisplay = $scope.selectedCategory.label;
      
      eventsFactory.getEventByTimeAndCategory($scope.timeValue, $scope.categoryValue)
        .success(function(data){
          $scope.allEvents = data;
        });

    });

  $scope.selectEventCategory = function(category){
    $scope.selectedCategory = category;
    $scope.categoryToDisplay = $scope.selectedCategory.label;
    $scope.categoryValue = $scope.selectedCategory.value;
  
    eventsFactory.getEventByTimeAndCategory($scope.timeValue, $scope.categoryValue)
      .success(function(data){
        $scope.allEvents = data;
      });

  };

  
  $scope.selectTime = function(time){
    $scope.selectedTime = time;

    $scope.timeToDisplay = $scope.selectedTime.label;
    $scope.timeValue = $scope.selectedTime.value;
    
    eventsFactory.getEventByTimeAndCategory($scope.timeValue, $scope.categoryValue)
      .success(function(data){
        $scope.allEvents = data;
      });
  };

  $rootScope.goToTop = function(){
    $location.hash('top');
    $anchorScroll();
  };

}]); 

