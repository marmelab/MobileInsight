'use strict';

angular.module('controllers')
    .controller('GlobalCtrl', 
        ["$scope", "Restangular", function ($scope, Restangular) {
            var Project = Restangular.all('projects');
            Project.getList().then(function(projects){
                 $scope.projects = projects;
             })
            
    }]);
