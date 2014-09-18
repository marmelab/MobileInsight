'use strict';

angular.module('controllers')
    .controller('ConfigurationCtrl', 
        ["$scope", "localstorage", "$http", "insight", function ($scope, localstorage, $http, insight) {

            $scope.getMessage = function(name) {
                return 'Hello ' + name;
            };

            $scope.userdatas = {
                userid: '',
                usertoken: ''
            };

            $scope.insightParams = false;

            var updateInsightParams = function () {
                var datasStorage = localstorage.getObject('insightParams');
                if (datasStorage.userid != undefined) {
                    $scope.insightParams = datasStorage;
                }
                console.log('après un check : ' + $scope.insightParams.userid);
            };

            $scope.saveUserParams = function() {
                var testUrl = 'https://' + $scope.userdatas.userid + ':' + $scope.userdatas.usertoken + '@' + insight.uri + 'projects';
                $http({method: 'GET', url: testUrl}).
                    success(function(data, status, headers, config) {
                        console.log('MARCHE BIEN');
                    }).
                    error(function(data, status, headers, config) {
                        console.log('MARCHE PAS');
                    });
                // setInsightParams($scope.userdatas);
                // updateInsightParams();
                // $scope.userdatas = {
                //     userid: '',
                //     usertoken: ''
                // };
            };

            var setInsightParams = function (insightParams) {
                localstorage.setObject('insightParams', insightParams);
            };

            $scope.clearInsightParams = function () {
                localstorage.removeObject('insightParams');
                $scope.insightParams = false;
            };
            // setInsightParams('monid', 'montoken');
            updateInsightParams();
            // clearInsightParams();
            // checkInsightParams();
    }]);
