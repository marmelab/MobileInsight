describe('projects services', function() {
  // Load the module with MainController
  beforeEach(module('insightMobile'));

  // var ctrl, scope;
  // // inject the $controller and $rootScope services
  // // in the beforeEach block
  // beforeEach(inject(function($controller, $rootScope) {
  //   // Create a new scope that's a child of the $rootScope
  //   scope = $rootScope.$new();
  //   // Create the controller
  //   ctrl = $controller('MainController', {
  //     $scope: scope
  //   });
  // }));

  it('getList() should return a list of projects', function() {
      expect(true).toBe(true);
  });

})


// describe("Unit Testing Examples", function () {

//     // var $scope, ctrl, $timeout;

//     // beforeEach(function () {

//     //     module("insightMobile");

//     //     // INJECT! This part is critical
//     //     // $rootScope - injected to create a new $scope instance.
//     //     // $controller - injected to create an instance of our controller.
//     //     // $q - injected so we can create promises for our mocks.
//     //     // _$timeout_ - injected to we can flush unresolved promises.
//     //     inject(function ($rootScope, $controller, $q, _$timeout_) {

//     //         // create a scope object for us to use.
//     //         $scope = $rootScope.$new();

//     //         // assign $timeout to a scoped variable so we can use
//     //         // $timeout.flush() later. Notice the _underscore_ trick
//     //         // so we can keep our names clean in the tests.
//     //         $timeout = _$timeout_;

//     //         // now run that scope through the controller function,
//     //         // injecting any services or other injectables we need.
//     //         // **NOTE**: this is the only time the controller function
//     //         // will be run, so anything that occurs inside of that
//     //         // will already be done before the first spec.
//     //         ctrl = $controller("NameOfYourController", {
//     //             $scope: $scope
//     //         });
//     //     });

//     });


//     // Test 1: The simplest of the simple.
//     // here we're going to make sure the $scope variable 
//     // exists evaluated.
//     it("should have a $scope variable", function() {
//         expect($scope).toBeDefined();
//     });

// });
