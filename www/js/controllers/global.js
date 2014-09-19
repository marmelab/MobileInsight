'use strict';

angular.module('controllers')
    .controller('GlobalCtrl', function ($scope, projects) {
            projects.getList().then(function(projectList){
                 $scope.projectList = projectList;
             })
    });
