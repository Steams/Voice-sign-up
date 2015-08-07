(function() {
  angular.module("voice-signup").controller("testCtrl", [
    '$scope', function($scope) {
      $scope.obj = {
        name: "Skai"
      };
      return $scope.change = function() {
        $scope.obj.name = "Radcliffe";
        return console.log($scope.obj);
      };
    }
  ]);

}).call(this);
