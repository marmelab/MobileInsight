'use strict';

angular.module('controllers')
    .controller('ProjectCtrl', function ($scope, $stateParams, $state, projects) {
            projects.getOne($stateParams.projectId).then(function(project) {
              $scope.project = project;
            }, function(error) {
                $state.go('app.error');
            });
    });
