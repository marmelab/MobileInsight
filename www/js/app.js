'use strict';

angular.module('controllers', []);
angular.module('config', []);
angular.module('services', ['config']);

angular.module('mobile-insight', [
  'ionic', 
  'controllers',
  'services'
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

