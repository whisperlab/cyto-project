define(['cyEditor'], function(CyEditor) {

  return ['$scope', '$http', function($scope, $http) {

    var cyEditor = new CyEditor($scope);
   
    // Because controller is loaded asynchronously Angular's initial call
    // to $apply gets missed, and we have to explicitly call it.

    $scope.$apply(function() {

      //calls init on the scope, which should be defined within the cyEditor class
      $scope.init();
    });
  }];
});
