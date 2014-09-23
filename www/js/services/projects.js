'use strict';

angular.module('services')
  .service('projects', function (insight, projectparser, localstorage, x2js, Restangular, $q) {
    
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
                //TODO set a better cache policy
                RestangularConfigurer.setDefaultHttpFields({cache: false})
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

        var getProjectList = function () {
                var deferred = $q.defer();
                var projectList = localstorage.getObject("projectList");
                if (!projectList.lenght) {
                        getList().then(function(projectList) {  
                            localstorage.setObject("projectList", projectList);
                            deferred.resolve(projectList);
                        }, function(error) {
                            deferred.reject(error);
                        });
                } else {
                    deferred.resolve(projectList);
                }

                return deferred.promise;
        };

        var refreshProjectList = function () {
                var deferred = $q.defer();
                getList().then(function(refreshedProjectList){
                    localstorage.removeObject("projectList");
                    localstorage.setObject("projectList", refreshedProjectList);
                    deferred.resolve(refreshedProjectList);
                }, function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
        }

        var getOne = function (projectId) {
            var deferred = $q.defer();
            projectCrawlettangular.one('projects', projectId).get().then(function(project){
                deferred.resolve(projectparser.parseSingleProject(project));
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        var getProject = function (projectId) {
                var deferred = $q.defer();
                var project = localstorage.getObject(projectId);
                if (project.id === undefined) {
                        getOne(projectId).then(function(project) {  
                            localstorage.setObject(project.id, project);
                            deferred.resolve(project);
                        }, function(error) {
                            deferred.reject(error);
                        });
                } else {
                    deferred.resolve(project);
                }

                return deferred.promise;
        };

        var refreshProject = function (projectId) {
                var deferred = $q.defer();
                getOne(projectId).then(function(refreshedProject){
                    localstorage.removeObject(projectId);
                    localstorage.setObject(refreshedProject.id, refreshedProject);
                    deferred.resolve(refreshedProject);
                }, function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
        }

        return {
          getProjectList: getProjectList,
          refreshProjectList: refreshProjectList,
          getProject: getProject,
          refreshProject: refreshProject
        };

  });
