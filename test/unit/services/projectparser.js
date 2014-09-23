describe('Service: projectparser', function () { 

    beforeEach(module('services'));

    var projectparser;

    beforeEach(inject(function(_projectparser_) { 
         projectparser = _projectparser_;
    }));

    it('parseListProject() should return an object with an id, a name and a visibility status', function() { 
        var insightJson = getRectangularListResult(); 
        var parsedJson = projectparser.parseListProject(insightJson);

        expect(parsedJson).toBeDefined();
        expect(parsedJson.id).toBe("abcd-abcd-12345");
        expect(parsedJson.name).toBe("fake analyse");
        expect(parsedJson.is_public).toBe("true");
    });

    it('parseListProject() should return an object with last analysis', function() { 
        var insightJson = getRectangularListResult(); 
        var parsedJson = projectparser.parseListProject(insightJson);

        expect(parsedJson.last_analysis).toBeDefined();
    });

    it('last analysis object must contain number, grade, date, violations details and remediation cost', function() { 
        var insightJson = getRectangularListResult(); 
        var parsedJson = projectparser.parseListProject(insightJson);

        expect(parsedJson.last_analysis).toBeDefined();
        expect(parsedJson.last_analysis.number).toBe("1");
        expect(parsedJson.last_analysis.grade).toBe("gold");
        expect(parsedJson.last_analysis.next_grade).toBe("platinium");
        expect(parsedJson.last_analysis.end_at).toBe("2014-08-24T08:01:35+0200");
        expect(parsedJson.last_analysis.duration).toBe("10");
        expect(parsedJson.last_analysis.nb_violations).toBe("2");
        expect(parsedJson.last_analysis.nb_violations_new).toBe("1");
        expect(parsedJson.last_analysis.nb_violations_existing).toBe("1");
        expect(parsedJson.last_analysis.nb_violations_fixed).toBe("1");
        expect(parsedJson.last_analysis.nb_violations_ignored).toBe("0");
        expect(parsedJson.last_analysis.remediation_cost).toBe("200");
    });

    it('parseListProject() should return an object with last analysis without violations list', function() { 
        var insightJson = getRectangularListResult(); 
        var parsedJson = projectparser.parseListProject(insightJson);

        expect(parsedJson.last_analysis.violations).not.toBeDefined();
    });

    it('parseSingleProject() should return the same object that parseListProject(), but with a violations list', function() { 
        var insightJson = getRectangularSingleResult(); 
        var parsedJson = projectparser.parseSingleProject(insightJson);

        expect(parsedJson).toBeDefined();
        expect(parsedJson.id).toBe("abcd-abcd-12345");
        expect(parsedJson.name).toBe("fake analyse");
        expect(parsedJson.is_public).toBe("true");
        expect(parsedJson.last_analysis).toBeDefined();
        expect(parsedJson.last_analysis.number).toBe("1");
        expect(parsedJson.last_analysis.grade).toBe("gold");
        expect(parsedJson.last_analysis.next_grade).toBe("platinium");
        expect(parsedJson.last_analysis.end_at).toBe("2014-08-24T08:01:35+0200");
        expect(parsedJson.last_analysis.duration).toBe("10");
        expect(parsedJson.last_analysis.nb_violations).toBe("2");
        expect(parsedJson.last_analysis.nb_violations_new).toBe("1");
        expect(parsedJson.last_analysis.nb_violations_existing).toBe("1");
        expect(parsedJson.last_analysis.nb_violations_fixed).toBe("1");
        expect(parsedJson.last_analysis.nb_violations_ignored).toBe("0");
        expect(parsedJson.last_analysis.remediation_cost).toBe("200");
        expect(parsedJson.last_analysis.violations).toBeDefined();
    });

    it('violation in violations list must be classified by severity, category and title', function() { 
        var insightJson = getRectangularSingleResult(); 
        var parsedJson = projectparser.parseSingleProject(insightJson);

        expect(parsedJson.last_analysis.violations.critical.counter).toBe(1);
        expect(parsedJson.last_analysis.violations.critical.categories.security.counter).toBe(1);
        expect(parsedJson.last_analysis.violations.critical.categories.security.titles["titre-1"].counter).toBe(1);
        expect(parsedJson.last_analysis.violations.minor.categories.deadcode.titles["titre-2"].counter).toBe(2);
    });

    it('each violation in violations list must contain category, severity, context, line, title and message', function() { 
        var insightJson = getRectangularSingleResult(); 
        var parsedJson = projectparser.parseSingleProject(insightJson);
        var violation = parsedJson.last_analysis.violations.minor.categories.deadcode.titles["titre-2"].violations[0];
        expect(violation.category).toBeDefined();
        expect(violation.severity).toBeDefined();
        expect(violation.context).toBeDefined();
        expect(violation.line).toBeDefined();
        expect(violation.title).toBeDefined();
        expect(violation.message).toBeDefined();
    });

    var getRectangularListResult = function () {
        return {
            id: {
                __cdata : "abcd-abcd-12345"
            },
            name: {
                __cdata : "fake analyse"
            },
            public: "true",
            'last-analysis': {
                number: "1",
                failded: "false",
                grade: {
                    __cdata : "gold"
                },
                'next-grade': {
                    __cdata : "platinium"
                },
                'end-at': {
                    __cdata : "2014-08-24T08:01:35+0200"
                },
                duration: "10", 
                'nb-violations': "2",
                'nb-violations-existing': "1",
                'nb-violations-fixed': "1",
                'nb-violations-ignored': "0",
                'nb-violations-new': "1",
                'remediation-cost': "200"
            }
        };
    };

    var getRectangularSingleResult = function () {
        var jsonProject = getRectangularListResult();
        jsonProject["last-analysis"].violations = {violation: []};
        jsonProject["last-analysis"].violations.violation.push({
            '_category': "security",
            '_severity': "critical",
            context: "",
            line: "0",
            message: {
                '__cdata': "The checker detected 1 security issues in package symfony/symfony installed in version 2.4.4.0 1) Code injection in the way Symfony implements translation caching in FrameworkBundle."
            },
            title: "Titre 1"
        });
        jsonProject["last-analysis"].violations.violation.push({
            '_category': "deadcode",
            '_severity': "minor",
            context: {
                '__cdata' : "$loader = require_once __DIR__.'/../app/bootstrap.php.cache';↵↵// Use APC for autoloading to improve performance.↵//",
                '_end-line': "16",
                '_start-line': "6"
            },
            line: "11",
            message: {
                '__cdata': "Commented out code reduces readability and lowers the code confidence for other developers. If it's common usage for debug, it should not be committed. Using a version control system, such code can be safely removed."
            },
            title: "Titre 2"
        });
        jsonProject["last-analysis"].violations.violation.push({
            '_category': "deadcode",
            '_severity': "minor",
            context: {
                '__cdata' : "$loader = require_once __DIR__.'/../app/bootstrap.php.cache';↵↵// Use APC for autoloading to improve performance.↵//",
                '_end-line': "16",
                '_start-line': "6"
            },
            line: "56",
            message: {
                '__cdata': "Commented out code reduces readability and lowers the code confidence for other developers. If it's common usage for debug, it should not be committed. Using a version control system, such code can be safely removed."
            },
            title: "Titre 2"
        });

        return jsonProject;
    }
});
