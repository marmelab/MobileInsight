'use strict';

angular.module('controllers')
    .controller('ConfigurationCtrl', function ($scope, localstorage, $http, insight, projects, userconfig) {

            $scope.insightParams = false;
            $scope.userError = false;

            $scope.userdatas = {
                userid: '',
                usertoken: ''
            };

            $scope.saveUserParams = function() {

                // userconfig.test($scope.userdatas).
                // success(function() {
                //     console.log('OUI');
                //     $scope.userError = false;
                //     clearUserDatas();
                // }).
                // error(function() {
                //     console.log('NON');
                //     $scope.userError = true;
                // });
                              
                // projects.checkUserParams($scope.userdatas).then(function(projects){
                //         setInsightParams($scope.userdatas);
                //         updateInsightParams();
                //         clearUserDatas();
                //         $scope.userError = false;
                // }, function(err) {
                //     clearUserDatas();
                //     $scope.userError = true;
                // });

                var testUrl = 'https://' + $scope.userdatas.userid + ':' + $scope.userdatas.usertoken + '@' + insight.uri + 'projects';
                $http.get(testUrl).
                    success(function() {
                        setInsightParams($scope.userdatas);
                        updateInsightParams();
                        clearUserDatas();
                        $scope.userError = false;
                    }).
                    error(function() {
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
