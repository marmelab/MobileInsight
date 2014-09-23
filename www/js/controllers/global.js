'use strict';

angular.module('controllers')
    .controller('GlobalCtrl', function ($scope, $state, projects, $timeout) {
        $scope.refreshListClass = "button-royal ion-refresh";
        $scope.refreshListTitle = "Refresh project list";
        projects.getProjectList().then(function(projectList){
             $scope.projectList = projectList;
         }, function(error) {
            $state.go('app.error');
         });

        $scope.refreshProjectList = function () {
            $scope.refreshListButtonClass = "button-calm";
            $scope.refreshListIconeClass = "ion-refreshing";
            $scope.refreshListTitle = "Updating project list";
            projects.refreshProjectList().then(function(refreshedProjectList){
                $scope.projectList = refreshedProjectList;
                $scope.refreshListButtonClass = "button-balanced";
                $scope.refreshListIconeClass = "ion-refresh";
                $scope.refreshListTitle = "Project list is updated";
                $timeout(initRefreshListButton, 3000)
            }, function(error) {
                $scope.refreshListButtonClass = "button-assertive";
                $scope.refreshListIconeClass = "ion-refresh";
                $scope.refreshListTitle = "Failed to update";
                $timeout(initRefreshListButton, 3000)
            });
        };

        var initRefreshListButton = function () {
            $scope.refreshListButtonClass = "button-stable";
            $scope.refreshListIconeClass = "ion-refresh";
            $scope.refreshListTitle = "Refresh project list";
        };

        initRefreshListButton();

    });
