'use strict';

angular.module('controllers')
    .controller('ConfigurationCtrl', function ($scope, $state, localstorage, $http, insight, projects, userconfig) {

            $scope.insightParams = false;
            $scope.userError = false;

            $scope.userdatas = {
                userid: '',
                usertoken: ''
            };

            $scope.saveUserParams = function() {
                userconfig.test($scope.userdatas).then(function() {
                    setInsightParams($scope.userdatas);
                    updateInsightParams();
                    clearUserDatas();
                    $scope.userError = false;
                }, function(error) {
                    clearUserDatas();
                    $scope.userError = true;
                });
            };

            $scope.clearInsightParams = function () {
                localstorage.removeObject('insightParams');
                $scope.insightParams = false;
            };

            var updateInsightParams = function () {
                var datasStorage = localstorage.getObject('insightParams');
                if (datasStorage.userid != undefined) {
                    $scope.insightParams = datasStorage;
                }
            };

            var setInsightParams = function (insightParams) {
                localstorage.setObject('insightParams', insightParams);
            }; 

            var clearUserDatas = function () {
                $scope.userdatas = {
                    userid: '',
                    usertoken: ''
                };
            }; 

            updateInsightParams();
    });
