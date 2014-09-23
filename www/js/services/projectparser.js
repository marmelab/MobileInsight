'use strict';

angular.module('services')
  .service('projectparser', function projectparser($speakingurl) {

        var classifiedViolations = {};
    
        var parseListProject = function (projectFromXml) {
            var project = parseProject(projectFromXml);
            project.last_analysis = parseAnalysis(projectFromXml["last-analysis"]);
           
            return project;
        };

        var parseSingleProject = function (projectFromXml) {
            var project = parseListProject(projectFromXml);
            project.last_analysis.violations = [];
            if (projectFromXml["last-analysis"]["violations"] != undefined) {
                projectFromXml["last-analysis"]["violations"]["violation"].forEach(addViolation);
            }
            project.last_analysis.violations = classifiedViolations;
            
            return project;
        };

        var addViolation = function (violationRaw) {
            var violation = parseViolation(violationRaw);
            var severitySlug = $speakingurl.getSlug(violation.severity);
            var categorySlug = $speakingurl.getSlug(violation.category);
            var titleSlug = $speakingurl.getSlug(violation.title);
            if (classifiedViolations[severitySlug] == undefined) {
              classifiedViolations[severitySlug] = {
                counter: 0,
                title: violation.severity,
                categories: {}
              }
            }
            if (classifiedViolations[severitySlug]["categories"][categorySlug]   == undefined) {
              classifiedViolations[severitySlug]["categories"][categorySlug] = {
                counter: 0,
                title: violation.category,
                titles: {}
              }
            }
            if (classifiedViolations[severitySlug]["categories"][categorySlug]["titles"][titleSlug]   == undefined) {
              classifiedViolations[severitySlug]["categories"][categorySlug]["titles"][titleSlug] = {
                counter: 0,
                title: violation.title,
                slug: titleSlug,
                violations: []
              }
            }
            classifiedViolations[severitySlug]["counter"] += 1;
            classifiedViolations[severitySlug]["categories"][categorySlug]["counter"] += 1;
            classifiedViolations[severitySlug]["categories"][categorySlug]["titles"][titleSlug]["counter"] += 1;
            classifiedViolations[severitySlug]["categories"][categorySlug]["titles"][titleSlug]["violations"].push(violation);
        }

        var parseViolation = function(violationFromXml) {
            var violation = {
                category: violationFromXml["_category"],
                severity: violationFromXml["_severity"],
                context: violationFromXml["context"],
                line: violationFromXml["line"],
                title: violationFromXml["title"],
                message: violationFromXml["message"].__cdata,
            }

            return violation;
        }

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
                  remediation_cost: analysisFromXml["remediation-cost"]
            }

            return analysis;
        }



        return {
          parseListProject: parseListProject,
          parseSingleProject: parseSingleProject
        };

  });
