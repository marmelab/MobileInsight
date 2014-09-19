'use strict';

angular.module('services')
  .service('userconfig', function (insight, x2js, Restangular, $q) {

        var test = function(userdatas) {
            var deferred = $q.defer();
            var testUrl = 'https://' + userdatas.userid + ':' + userdatas.usertoken + '@' + insight.uri ;
            var testangular = Restangular.withConfig(function(RestangularConfigurer) {
                RestangularConfigurer.setBaseUrl(testUrl);
                RestangularConfigurer.setErrorInterceptor(
                    function(response) {
                        return true; 
                });
                RestangularConfigurer.addResponseInterceptor(
                  function(data, operation, what) {
                    return [];
                });
            });
            testangular.all('projects').getList().then(function(projects){
                deferred.resolve(true);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        return {
          test: test
        };

  });
