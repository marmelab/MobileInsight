'use strict';

angular.module('controllers')
    .controller('ProjectCtrl', function ($scope, $stateParams, $state, projects) {
            projects.getOne($stateParams.projectId).then(function(project) {
              $scope.project = project;
            }, function(error) {
                $state.go('app.error');
            });
    })
    .controller('ProjectViolationCtrl', function ($scope, $stateParams, $state, projects) {
            projects.getOne($stateParams.projectId).then(function(project) {
              $scope.project = project;
              $scope.violationType = $stateParams.violationType;
            }, function(error) {
                $state.go('app.error');
            });
    })
    .controller('ViolationCtrl', function ($scope, $stateParams, $state, projects) {
            projects.getOne($stateParams.projectId).then(function(project) {
            $scope.project = project;
            $scope.project.last_analysis.violations.forEach(function(violation){
                if (violation.internal_id == $stateParams.violationId) {
                    $scope.violation = violation;
                }
            });
            }, function(error) {
                $state.go('app.error');
            });
    });


