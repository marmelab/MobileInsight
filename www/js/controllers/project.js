'use strict';

angular.module('controllers')
    .controller('ProjectCtrl', 
         ["$scope", "$stateParams", "Restangular", function ($scope, $stateParams, Restangular) {
            Restangular.one('projects', $stateParams.projectId).get().then(function(project) {
              $scope.project = project;
              console.log(project)
            });
    }]);
