'use strict';

angular.module('controllers')
    .controller('GlobalCtrl', function ($scope, $state, projects) {
        projects.getProjectList().then(function(projectList){
             $scope.projectList = projectList;
         }, function(error) {
            $state.go('app.error');
         });

        $scope.refreshProjectList = function () {
            // TODO make ion-refresh turn when it's work
            projects.refreshProjectList().then(function(refreshedProjectList){
                $scope.projectList = refreshedProjectList;
            }, function(error) {
                //TODO display something for that
                console.log(error);
            });
        }

    });
