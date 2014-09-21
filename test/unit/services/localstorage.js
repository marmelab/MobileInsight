describe('Service: localStorage', function () { 

    // load the service's module
    beforeEach(module('services'));

    var localStorage, $window, fakeStore;

    // ask the service to angular
    beforeEach(inject(function(_localstorage_, _$window_) { 
        localStorage = _localstorage_;
        $window = _$window_;
        fakeStore = {};

        spyOn($window.localStorage, 'setItem').andCallFake(function(key, value) {
           fakeStore[key] = value;
         });
        spyOn($window.localStorage, 'getItem').andCallFake(function(key) { 
            return fakeStore[key];
        });
        spyOn($window.localStorage, 'removeItem').andCallFake(function(key) { 
            return {};
        }); 
    }));

    it('It should save an object', function() { 
        var userParams = { userid: 'userid', usertoken: 'usertoken' }; 
        localStorage.setObject('insightParams', userParams);
        
        expect($window.localStorage.setItem).toHaveBeenCalledWith('insightParams', '{"userid":"userid","usertoken":"usertoken"}');
        expect(fakeStore['insightParams']).toBe('{"userid":"userid","usertoken":"usertoken"}');
    });

    it('It should retrieve an object', function() { 
        var userParams = { userid: 'userid', usertoken: 'usertoken' }; 
        localStorage.setObject('insightParams', userParams);
        var savedUserParams = localStorage.getObject('insightParams');
        
        expect($window.localStorage.getItem).toHaveBeenCalledWith('insightParams');
        expect(savedUserParams.userid).toBe('userid');
        expect(savedUserParams.usertoken).toBe('usertoken');
    }); 

    it('It should remove an object', function() { 
        var userParams = { userid: 'userid', usertoken: 'usertoken' }; 
        localStorage.setObject('insightParams', userParams);
        localStorage.removeObject('insightParams');
        var savedUserParams = localStorage.getObject('insightParams');
        
        expect($window.localStorage.setItem).toHaveBeenCalledWith('insightParams', '{"userid":"userid","usertoken":"usertoken"}');
        expect($window.localStorage.removeItem).toHaveBeenCalledWith('insightParams');
        expect(savedUserParams.usertoken).toBeDefined();
    }); 
    
    it('It return empty object if searched objet has not be saved', function() { 
        var savedUserParams = localStorage.getObject('insightParams');
        expect(savedUserParams).toBeDefined();
        expect(savedUserParams.usertoken).not.toBeDefined();
    }); 
});

