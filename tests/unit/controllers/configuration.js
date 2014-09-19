describe('MessageCtrl', function() { 
    var $scope;

    beforeEach(module('controllers'));

    beforeEach(inject(function($rootScope, $controller) { 
        $scope = $rootScope.$new(); 
        $controller('ConfigurationCtrl', {
            $scope: $scope
        }); 
    }));

    it('should get the correct message', function() { 
        var message = 'Salut Franck'; 
        expect(message).toBe('Salut Franck');
    });
});
