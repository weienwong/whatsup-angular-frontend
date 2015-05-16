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

  $rootScope.showTopButton = function(){
    if (document.documentElement.scrollTop > 0){
      return 1;
    }
    else{
      return 0;
    }
  };
  
  eventsFactory.getOrganizers().success(function(data){
    console.log(data);
  });

  $scope.event_types = [
    {type_long: 'University Events', type_short: 'uni_events'}, 
    {type_long: 'Job Info Sessions', type_short:'job_info'}
  ];

  $scope.setTypeOfEvent = function(type){
    if type.type_short === 'uni_events'

  }


  
  $location.hash('top');
  // populate university dropdown to allow for people to select a university
  eventsFactory.getUniversities()
    .success(function(data){
      $scope.universities = data;
      var universities_options = [];
      var i;
      universities_options.push({label: "All schools", value: 0});

      for (i in data){
        universities_options.push({label: data[i].name, value: data[i].id}) ;
      }

      $scope.universities_options = universities_options;
      $scope.selected_university = universities_options[1];
      
      });

  // populate timeframe dropdown
  var times = [];
  times.push({value: 'today', label: 'Today'});
  times.push({value: 'week', label: 'This Week'});
  times.push({value: 'month', label: 'This Month'});
  times.push({value: 'later', label: 'Next Month'});

  $scope.timeDropdown = times;
  
  // sets default time selection to be 'Today'
  $scope.selectedTime = times[1];
  $scope.timeToDisplay = $scope.selectedTime.label;
  $scope.timeValue = $scope.selectedTime.value;

  // method that returns job info sessions based on time and faculty and stores it in
  // $scope.jobInfoSessionData
  $scope.showJobInfoSession = function(time, faculty){
    eventsFactory.getJobInfoSession(time, faculty)
      .success(function(data){
        $scope.jobInfoSessionData = data;
      });
  };


  // this method is called when user has selected a faculty from the faculty dropdown
  // method takes in a facultyi_short string
  $scope.facultySearch = function(faculty){
    $scope.facultyToDisplay = faculty;
    $scope.showJobInfoSession($scope.timeValue, $scope.facultyToDisplay.faculty_short);
  };

  // this is called when user clicks on 'More'
  // populates a job details modal with more info about job info session
  $scope.showOneJobInfoSession = function(sessionId){
    eventsFactory.getOneJobInfoSession(sessionId)
      .success(function(data){
        $scope.moreJobInfoSessionData = data;
      });
  };

  // populates event categories dropdown 
  // when event category is selected, it immediately looks sends a request to show all events

  eventsFactory.getEventCategories()
    .success(function(data){
      $scope.event_categories = data;
      var event_categories_options = [];

      for (var i in data){
        event_categories_options.push({label: data[i].category_name, value: data[i].id});
      }

      event_categories_options.push({label: 'All Events', value: 0});
      
      $scope.event_categories_options = event_categories_options;
      
      $scope.selectedCategory = event_categories_options[0];
      $scope.categoryValue = $scope.selectedCategory.value;
      $scope.categoryToDisplay = $scope.selectedCategory.label;

      // handles job info session case
      if ($scope.categoryValue == 27){

        // populates faculty dropdown
        // sets default dropdown selection value to be 'All' faculties
        eventsFactory.getFaculties()
          .success(function(data){
            var faculties = [];
      
            for (var i in data){
              faculties.push(data[i]);
            }
      
            $scope.facultiesDropdown = faculties;
      
            $scope.facultyToDisplay = faculties[0];
            $scope.facultyDisplayName = $scope.facultyToDisplay.faculty;
            $scope.facultyShortName = $scope.facultyToDisplay.faculty_short;

            $scope.showJobInfoSession($scope.timeValue, '');
      
          });
      }
      else {
        eventsFactory.getEventByTimeAndCategory($scope.timeValue, $scope.categoryValue)
          .success(function(data){
            $scope.allEvents = data;
          });
      }
      
    });
  
  
  // retreives and stores event info when event category has been selected
  $scope.selectEventCategory = function(category){
    $scope.selectedCategory = category;
    $scope.categoryToDisplay = $scope.selectedCategory.label;
    $scope.categoryValue = $scope.selectedCategory.value;

    // this covers job info session scenarios
    if ($scope.categoryValue == 27){
        $scope.showJobInfoSession($scope.timeValue, '');
    }
    else {
      // this covers regular events
      eventsFactory.getEventByTimeAndCategory($scope.timeValue, $scope.categoryValue)
        .success(function(data){
          $scope.allEvents = data;
        });
    }
  };

  // retreives and stores event when time has been selected 
  $scope.selectTime = function(time){
    $scope.selectedTime = time;

    $scope.timeToDisplay = $scope.selectedTime.label;
    $scope.timeValue = $scope.selectedTime.value;
    
    if ($scope.categoryValue == 27){
        $scope.showJobInfoSession($scope.timeValue, $scope.facultyToDisplay.faculty_short);
    }
    else {
      eventsFactory.getEventByTimeAndCategory($scope.timeValue, $scope.categoryValue)
        .success(function(data){
          $scope.allEvents = data;
        });
    }
  };
  
  // scrolls back to the top of the page
  $rootScope.goToTop = function(){

    console.log("Go to top is called!");

    if ($location.hash !== 'top'){
      $location.hash('top');
    }

    $anchorScroll.yOffset = 50;
    $anchorScroll();

  };

}]); 

