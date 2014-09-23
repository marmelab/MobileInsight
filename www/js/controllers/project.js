'use strict';

angular.module('controllers')
    .controller('ProjectCtrl', function ($scope, $stateParams, $state, projects, $timeout) {
            projects.getProject($stateParams.projectId).then(function(project) {
                setProjectToScope(project)
            }, function(error) {
                $state.go('app.error');
            });

            var setProjectToScope = function (project) {
                $scope.project = project;
                $scope.analysisDate = moment.utc($scope.project .last_analysis.end_at).fromNow();
                $scope.duration = moment.duration(Math.round($scope.project .last_analysis.duration), 'seconds').humanize();
                $scope.cost = moment.duration(Math.round($scope.project .last_analysis.remediation_cost), 'hours').humanize();
            }

            $scope.refreshProject = function () {
                $scope.refreshProjectButtonClass = "button-calm";
                $scope.refreshProjectIconeClass = "ion-refreshing";
                $scope.refreshProjectTitle = "Updating project";
                projects.refreshProject($stateParams.projectId).then(function(refreshedProject){
                    setProjectToScope(refreshedProject);
                    $scope.refreshProjectButtonClass = "button-balanced";
                    $scope.refreshProjectIconeClass = "ion-refresh";
                    $scope.refreshProjectTitle = "Project is updated";
                    $timeout(initRefreshProjectButton, 3000)
                }, function(error) {
                    $scope.refreshProjectButtonClass = "button-assertive";
                    $scope.refreshProjectIconeClass = "ion-refresh";
                    $scope.refreshProjectTitle = "Failed to update";
                    $timeout(initRefreshProjectButton, 3000)
                });
            };

        var initRefreshProjectButton = function () {
            $scope.refreshProjectButtonClass = "button-stable";
            $scope.refreshProjectIconeClass = "ion-refresh";
            $scope.refreshProjectTitle = "Refresh project";
        };

        initRefreshProjectButton();
            
    })
    .controller('ProjectViolationSeverityCtrl', function ($scope, $stateParams, $state, projects, localstorage) {
            projects.getProject($stateParams.projectId).then(function(project) {
                $scope.project = project;
                $scope.violationType = $stateParams.violationType;
                $scope.violationClass = getClassBySeverity($scope.violationType);
                $scope.violations = project.last_analysis.violations[$scope.violationType];
            }, function(error) {
                $state.go('app.error');
            });
    })
    .controller('ProjectViolationsTitleCtrl', function ($scope, $stateParams, $state, projects, localstorage) {
            projects.getProject($stateParams.projectId).then(function(project) {
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
