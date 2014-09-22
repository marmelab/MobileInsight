'use strict';

angular.module('controllers')
    .controller('ProjectCtrl', function ($scope, $stateParams, $state, projects, $ionicNavBarDelegate) {
            $scope.goBack = function() {
                $ionicNavBarDelegate.back();
            };
            projects.getOne($stateParams.projectId).then(function(project) {
              $scope.project = project;
              $scope.analysisDate = moment.utc(project.last_analysis.end_at).fromNow();
              $scope.duration = moment.duration(Math.round(project.last_analysis.duration), 'seconds').humanize();
              $scope.cost = moment.duration(Math.round(project.last_analysis.remediation_cost), 'hours').humanize();
            }, function(error) {
                $state.go('app.error');
            });
    })
    .controller('ProjectViolationCtrl', function ($scope, $stateParams) {
            $scope.violationType = $stateParams.violationType;
    })
    .controller('ViolationCtrl', function ($scope, $stateParams) {
            $scope.project.last_analysis.violations.forEach(function(violation){
                if (violation.internal_id == $stateParams.violationId) {
                    $scope.violation = violation;
                }
            });
    });


