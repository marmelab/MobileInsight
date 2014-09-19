'use strict';

angular.module('services')
  .service('projects', ["insight", "projectparser", "x2js", "Restangular", "$q", function projects(insight, projectparser, x2js, Restangular, $q) {
    
        var getInsightBaseUrl = function () {
            var userConf = 'https://' + insight.id + ':' + insight.token;

            return userConf + '@' + insight.uri
        }

        Restangular.setBaseUrl(getInsightBaseUrl());
        Restangular.setResponseInterceptor(
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
            }, deferred.reject);

            return deferred.promise;
        };

        var getOne = function (projectId) {
            var deferred = $q.defer();
            Restangular.one('projects', projectId).get().then(function(project){
                deferred.resolve(projectparser.parseSingleProject(project));
            }, deferred.reject);

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

  }]);
