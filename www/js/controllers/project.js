'use strict';

angular.module('controllers')
    .controller('ProjectCtrl', 
         ["$scope", "$stateParams", "projects", function ($scope, $stateParams, projects) {
            projects.getOne($stateParams.projectId).then(function(project) {
              $scope.project = project;
            });
    }]);
