'use strict';

angular.module('controllers')
    .controller('GlobalCtrl', function ($scope, $state, projects) {
        projects.getList().then(function(projectList){
             $scope.projectList = projectList;
         }, function(error) {
            $state.go('app.error');
         })

    });
