'use strict';

angular.module('controllers')
    .controller('GlobalCtrl', 
        ["$scope", "projects", function ($scope, projects) {
            projects.getList().then(function(projectList){
                 $scope.projectList = projectList;
             })
    }]);
