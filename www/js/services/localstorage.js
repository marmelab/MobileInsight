'use strict';

angular.module('services')
  .service('localstorage', function ($window) {
    
    return {
        set: function(key, value) {
            $window.localStorage.setItem(key, value);
        },
        get: function(key, defaultValue) {
            return $window.localStorage.getItem(key) || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage.setItem(key, JSON.stringify(value));
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage.getItem(key)  || '{}');
        },
        removeObject: function(key) {
            return $window.localStorage.removeItem(key);
        },
    }

  });
