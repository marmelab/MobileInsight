'use strict';

angular.module('controllers')
    .controller('ConfigurationCtrl', 
        ["$scope", function ($scope) {
            $scope.getMessage = function(name) {
                return 'Hello ' + name;
            };
    }]);
