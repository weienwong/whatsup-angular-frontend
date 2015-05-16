'use strict';

var eventsFactory = angular.module('EventsFactory', []);

eventsFactory.factory('eventsFactory', 
    ['$http', 
      function($http){
        var baseUrl = '/events';

        eventsFactory.getEventByTimeAndCategory = function(time, category_id){
          return $http.get(baseUrl + '?when=' + time + '&category_id=' + category_id);
        };

        eventsFactory.getEventByCategory = function(event_category){
          return $http.get(baseUrl + '/event_category/' + event_category);
        };

        eventsFactory.getJobInfoSession = function(time, faculty, studentType){
          return $http.get('/job_info_sessions?time=' + time + '&faculty=' + faculty);
        };

        eventsFactory.getOneJobInfoSession = function(id){
          return $http.get('/job_info_sessions/' + id);
        }

        eventsFactory.getEventCategories = function(){
          return $http.get('/event_categories');
        };

        eventsFactory.getEventsByCategoryId = function(categoryId){
          return $http.get('/event_category/' + categoryId);
        };

        eventsFactory.getUniversities = function(){
          return $http.get('/universities');
        };

        eventsFactory.getFaculties = function(){
          return $http.get('/faculties');
        };

        eventsFactory.getStudentType = function(){
          return $http.get('/student_types');
        };

        eventsFactory.getJobInfoSessionCountByTime = function(){
          return $http.get('/job_info_sessions_count');
        };

        eventsFactory.getOrganizers = function(){
          return $http.get('/api/v2/sites')
        };

        return eventsFactory;

      }
    ]
    
);
