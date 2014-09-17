angular.module('minsight.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('ProjectsCtrl', function($scope) {
  $scope.projects = [
    { title: 'projet 1', id: 1 },
    { title: 'projet 2', id: 2 }
  ];
})

.controller('ProjectCtrl', function($scope, $stateParams) {
})

.controller('ConfigurationCtrl', function($scope) {
});
