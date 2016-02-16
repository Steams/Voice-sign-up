(function() {
  angular.module("voice-signup").controller("thanks_Ctrl", [
    "$scope", "$state", function($scope, $state) {
      var goToWelcome, init, reveal;
      console.log("Thanks");
      goToWelcome = function() {
        document.getElementsByClassName("js-monitor")[0].className += " isTransitioning";
        return setTimeout(function() {
          console.log("going to welcome");
          return $state.go("welcome");
        }, 1000);
      };
      reveal = function() {
        return setTimeout(function() {
          var cl;
          cl = document.getElementsByClassName("js-monitor")[0].className;
          document.getElementsByClassName("js-monitor")[0].className = cl.replace("isTransitioning", '');
          return setTimeout(function() {
            return document.getElementsByClassName("js-monitor")[0].className += "thanks";
          }, 200);
        }, 500);
      };
      init = function() {
        return reveal();
      };
      init();
      return setTimeout(function() {
        return goToWelcome();
      }, 3000);
    }
  ]);

}).call(this);
