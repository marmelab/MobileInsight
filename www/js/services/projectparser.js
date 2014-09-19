'use strict';

angular.module('services')
  .service('projectparser', function projectparser() {
    
        var parseListProject = function (projectFromXml) {
            var project = {
                id: projectFromXml.id.__cdata,
                name: projectFromXml.name.__cdata
            };

            return project;
        };

        var parseSingleProject = function (projectFromXml) {
            var project = {};
            project.id = projectFromXml.id.__cdata,
            project.name = projectFromXml.name.__cdata

            return project;
        };

        return {
          parseListProject: parseListProject,
          parseSingleProject: parseSingleProject
        };

  });
