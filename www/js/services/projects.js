'use strict';

angular.module('services')
  .service('projects', function (insight, projectparser, x2js, Restangular, $q) {
    
        var getInsightBaseUrl = function () {
            var userConf = 'https://' + insight.id + ':' + insight.token;

            return userConf + '@' + insight.uri
        }

        Restangular.setBaseUrl(getInsightBaseUrl());
        Restangular.setErrorInterceptor(
            function(response) {
                if (response.status == 401 || response.status == 400 ) {
                    console.log("Login required... ");
                } else if (response.status == 404) {
                    console.log("Resource not found...");
                }
                return true; //MUST BE TRUE, else couldn't catch error in Restangular promise
        });
        Restangular.addResponseInterceptor(
          function(data, operation, what) {
            if (operation == 'getList') {
                return x2js.xml_str2json(data).projects.project;
            }
            if (operation == 'get') {
                return x2js.xml_str2json(data).project;
            }
            return x2js.xml_str2json(data);
        });

        var getList = function () {
            var deferred = $q.defer();
            Restangular.all('projects').getList().then(function(projects){
                var projectsList = {
                    nbProjects: projects.length,
                    projects: []
                };
                projects.forEach(function(project){
                    projectsList.projects.push(projectparser.parseListProject(project));
                })
                deferred.resolve(projectsList);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        var getOne = function (projectId) {
            var deferred = $q.defer();
            Restangular.one('projects', projectId).get().then(function(project){
                deferred.resolve(projectparser.parseSingleProject(project));
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        var checkUserParams = function (userdatas) {
            var testUrl = 'https://' + userdatas.userid + ':' + userdatas.usertoken + '@' + insight.uri ;
            Restangular.setBaseUrl(testUrl);
            return Restangular.all('projects').getList();
        };

        return {
          getList: getList,
          getOne: getOne,
          checkUserParams: checkUserParams
        };

  });
