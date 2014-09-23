'use strict';

angular.module('controllers')
    .controller('ProjectCtrl', function ($scope, $stateParams, $state, projects) {
            projects.getOne($stateParams.projectId).then(function(project) {
              $scope.project = project;
              $scope.analysisDate = moment.utc(project.last_analysis.end_at).fromNow();
              $scope.duration = moment.duration(Math.round(project.last_analysis.duration), 'seconds').humanize();
              $scope.cost = moment.duration(Math.round(project.last_analysis.remediation_cost), 'hours').humanize();
            }, function(error) {
                $state.go('app.error');
            });
    })
    .controller('ProjectViolationSeverityCtrl', function ($scope, $stateParams, $state, projects) {
            projects.getOne($stateParams.projectId).then(function(project) {
              $scope.project = project;
              $scope.violationType = $stateParams.violationType;
              $scope.violationClass = getClassBySeverity($scope.violationType);
              $scope.violations = project.last_analysis.violations[$scope.violationType];
            }, function(error) {
                $state.go('app.error');
            });
    })
    .controller('ProjectViolationsTitleCtrl', function ($scope, $stateParams, $state, projects) {
            projects.getOne($stateParams.projectId).then(function(project) {
            $scope.project = project;
            $scope.violationType = $stateParams.violationType;
            $scope.violationClass = getClassBySeverity($scope.violationType);
            $scope.violationCat = project.last_analysis.violations[$scope.violationType]["categories"][$stateParams.violationCat];
            $scope.violationsByTitle= $scope.violationCat.titles[$stateParams.violationTitle];
            }, function(error) {
                $state.go('app.error');
            });
    });

var getClassBySeverity = function (severity) {
    var violationClass = "stable";
    switch (severity) {
      case "critical":
        violationClass = "assertive"
        break;
      case "major":
        violationClass = "energized"
        break;
      case "minor":
        violationClass = "calm"
        break;
      case "info":
        violationClass = "dark"
        break;
    };

    return violationClass;
};
