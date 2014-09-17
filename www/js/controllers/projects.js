'use strict';

angular.module('controllers')
    .controller('ProjectsCtrl', 
        ["$scope", function ($scope) {
            $scope.projects = [
                { title: 'projet 1', id: 1 },
                { title: 'projet 2', id: 2 }
            ];
    }]);
