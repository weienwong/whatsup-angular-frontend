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

        eventsFactory.getEventCategories = function(){
          return $http.get('/event_categories');
        };

        eventsFactory.getEventsByCategoryId = function(categoryId){
          return $http.get('/event_category/' + categoryId);
        };

        eventsFactory.getUniversities = function(){
          return $http.get('/universities');
        };

        return eventsFactory;

      }
    ]
    
);
