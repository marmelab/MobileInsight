'use strict';

angular.module('controllers')
    .controller('GlobalCtrl', 
        ["$scope", "projects", function ($scope, projects) {
            projects.getList().then(function(projects){
                 $scope.projects = projects;
             })
    }]);
