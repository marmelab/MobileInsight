'use strict';

angular.module('services')
  .service('projectparser', function projectparser() {
    
        var parseListProject = function (projectFromXml) {
            var project = parseProject(projectFromXml);
            project.last_analysis = parseAnalysis(projectFromXml["last-analysis"]);
           
            return project;
        };

        var parseSingleProject = function (projectFromXml) {
            var project = parseListProject(projectFromXml);
            project.last_analysis.violations = [];
            if (projectFromXml["last-analysis"]["violations"] != undefined) {
                projectFromXml["last-analysis"]["violations"]["violation"].forEach(function(violation, index){
                        project.last_analysis.violations.push(parseViolation(violation, index))
                })
            }
            project.last_analysis.nb_violations_by_severity = countViolationsByType('severity', project.last_analysis.violations);
            project.last_analysis.nb_violations_by_category = countViolationsByType('category', project.last_analysis.violations);

            return project;
        };

        var countViolationsByType = function (type, violations) {
          var violationsByType = {};
          if (violations.length < 1) {
            return violationsByType;
          }
          violations.forEach(function(violation){
            if (type == 'severity') {
              var typename = violation.severity
            } else {
              var typename = violation.category
            }
            if (violationsByType[typename] == undefined) {
              violationsByType[typename] = 0;
            }
            violationsByType[typename] += 1;
          });
          return violationsByType;
        };

        var parseProject = function(projectFromXml) {
            var project = {
                id: projectFromXml["id"].__cdata,
                name: projectFromXml["name"].__cdata,
                is_public: projectFromXml["public"]
            };

            return project;
        }

        var parseAnalysis = function(analysisFromXml) {
            var analysis = {
                  number: analysisFromXml["number"],
                  has_failed: analysisFromXml["failed"],
                  grade: analysisFromXml["grade"].__cdata,
                  next_grade: analysisFromXml["next-grade"].__cdata,
                  end_at: analysisFromXml["end-at"].__cdata,
                  duration: analysisFromXml["duration"],
                  nb_violations: analysisFromXml["nb-violations"],
                  nb_violations_new: analysisFromXml["nb-violations-new"],
                  nb_violations_existing: analysisFromXml["nb-violations-existing"],
                  nb_violations_fixed: analysisFromXml["nb-violations-fixed"],
                  nb_violations_ignored: analysisFromXml["nb-violations-ignored"],
            }

            return analysis;
        }

        var parseViolation = function(violationFromXml, indexForId) {
            var violation = {
                internal_id: indexForId,
                category: violationFromXml["_category"],
                severity: violationFromXml["_severity"],
                context: violationFromXml["context"],
                line: violationFromXml["line"],
                title: violationFromXml["title"],
                message: violationFromXml["message"].__cdata,
            }

            return violation;
        }

        return {
          parseListProject: parseListProject,
          parseSingleProject: parseSingleProject
        };

  });
