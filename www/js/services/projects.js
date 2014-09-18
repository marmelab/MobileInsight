'use strict';

angular.module('services')
  .service('projects', ["insight", "x2js", "Restangular", function projects(insight, x2js, Restangular) {
    
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
            return Restangular.all('projects').getList();
        };

        var getOne = function (projectId) {
            return Restangular.one('projects', projectId).get()
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
