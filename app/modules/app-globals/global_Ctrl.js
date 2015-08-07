(function() {
  angular.module("voice-signup").controller('global_Ctrl', [
    '$scope', '$state', function($scope, $state) {
      $scope.init = function() {
        return $state.go('main');
      };
      return $scope.init();
    }
  ]);

}).call(this);
