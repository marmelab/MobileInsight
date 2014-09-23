'use strict';

angular.module('controllers', []);
angular.module('constants', []);
angular.module('services', ['constants', 'cb.x2js', 'restangular', 'angular-speakingurl']);

angular.module('insightMobile', [
  'ionic', 
  'controllers',
  'services',
  'restangular',
  'constants',
  'angularMoment',
  'angular-speakingurl'
])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'GlobalCtrl'
    })
    .state('app.configuration', {
      url: "/configuration",
      views: {
        'menuContent' :{
          templateUrl: "templates/configuration.html",
          controller: 'ConfigurationCtrl'
        }
      }
    })
    .state('app.projects', {
      url: "/projects",
      views: {
        'menuContent' :{
          templateUrl: "templates/projects.html",
          controller: 'ProjectsCtrl'
        }
      }
    })
    .state('app.project', {
      url: "/projects/:projectId",
      views: {
        'menuContent' :{
          templateUrl: "templates/project.html",
          controller: 'ProjectCtrl'
        }
      }
    })
    .state('app.project_violations_severity', {
      url: "/projects/:projectId/violations/:violationType",
      views: {
        'menuContent' :{
          templateUrl: "templates/project_violations_severity.html",
          controller: 'ProjectViolationSeverityCtrl'
        }
      }
    })
    .state('app.project_violations_title', {
      url: "/projects/:projectId/violations/:violationType/:violationCat/:violationTitle",
      views: {
        'menuContent' :{
          templateUrl: "templates/project_violations_title.html",
          controller: 'ProjectViolationsTitleCtrl'
        }
      }
    })
    .state('app.error', {
      url: "/error",
      views: {
        'menuContent' :{
          templateUrl: "templates/error.html",
          controller: 'ErrorCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/projects');
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

