'use strict';

angular.module('controllers')
    .controller('ProjectCtrl', function ($scope, $stateParams, projects) {
            projects.getOne($stateParams.projectId).then(function(project) {
              $scope.project = project;
            });
    });
