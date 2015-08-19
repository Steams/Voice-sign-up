(function() {
  angular.module('voice-signup').controller('welcome_Ctrl', [
    '$scope', '$state', 'decoration_factory', 'Fields_factory', function($scope, $state, decorations, fields_fact) {
      var commands, current, maxPic, minPic, next, transition;
      $scope.decoration = decorations.text;
      $scope.titles = ["Pelican", "Chatwa", "UWI Maps"];
      $scope.titleIndex = 0;
      minPic = 4;
      maxPic = 13;
      $scope.picIndex = minPic;
      $scope.nextPicIndex = function() {
        if ($scope.picIndex + 1 < maxPic + 1) {
          return $scope.picIndex + 1;
        } else {
          return minPic;
        }
      };
      $scope.nextPic = function() {
        $scope.titleIndex = $scope.titleIndex + 1 < 3 ? $scope.titleIndex + 1 : 0;
        return $scope.picIndex = $scope.picIndex + 1 < maxPic + 1 ? $scope.picIndex + 1 : minPic;
      };
      current = document.getElementsByClassName("welcome-body-image")[0];
      next = document.getElementsByClassName("welcome-body-image")[1];
      $scope.slide = function() {
        console.log("sliding");
        current.className += " isSliding";
        next.className += " isSliding";
        return setTimeout(function() {
          $scope.nextPic();
          $scope.$apply();
          current.className = current.className.replace(" isSliding", "");
          return next.className = next.className.replace(" isSliding", "");
        }, 300);
      };
      setInterval(function() {
        return $scope.slide();
      }, 3000);
      document.onkeypress = function(evt) {
        var charCode;
        evt = evt || window.event;
        charCode = evt.keyCode || evt.which;
        if (charCode === 13) {
          return transition();
        }
      };
      transition = function() {
        document.getElementsByClassName("js-monitor")[0].className += " isTransitioning";
        return setTimeout(function() {
          fields_fact.refresh();
          return $state.go("sign-up");
        }, 1000);
      };
      return commands = {
        "sign me up": transition
      };
    }
  ]);

}).call(this);
