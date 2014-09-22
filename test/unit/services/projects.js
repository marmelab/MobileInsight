describe('Service: project', function() {

    beforeEach(module('services'));

    var projects, httpBackend, insight;

    beforeEach(inject(function(_projects_, $httpBackend, _insight_) { 
         projects = _projects_;
         httpBackend = $httpBackend;
         insight = _insight_;
    }));

    it('It should load xml', function() { 
        
    });

})

