'use strict';

angular.module('services')
  .service('projects', function (insight, projectparser, x2js, Restangular, $q, $http) {
    
        var getInsightBaseUrl = function () {
            var userConf = insight.method + '://' + insight.id + ':' + insight.token;

            return userConf + '@' + insight.uri + '/api'
        }

        var projectCrawlettangular = Restangular.withConfig(function(RestangularConfigurer) {
                RestangularConfigurer.setErrorInterceptor(
                    function(response) {
                        if (response.status == 401 || response.status == 400 ) {
                            console.log("Login required... ");
                        } else if (response.status == 404) {
                            console.log("Resource not found...");
                        }
                        return true; //MUST BE TRUE, else couldn't catch error in Restangular promise
                });
                RestangularConfigurer.addResponseInterceptor(
                  function(data, operation, what) {
                    if (operation == 'getList') {
                        return x2js.xml_str2json(data).projects.project;
                    }
                    if (operation == 'get') {
                        return x2js.xml_str2json(data).project;
                    }
                    return x2js.xml_str2json(data);
                });
                RestangularConfigurer.setBaseUrl(getInsightBaseUrl());
        });

        var getList = function () { 
            var deferred = $q.defer();
            projectCrawlettangular.all('projects').getList().then(function(projects){
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
            projectCrawlettangular.one('projects', projectId).get().then(function(project){
                deferred.resolve(projectparser.parseSingleProject(project));
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        return {
          getList: getList,
          getOne: getOne
        };

  });
