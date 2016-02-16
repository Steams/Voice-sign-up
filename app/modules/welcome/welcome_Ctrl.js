(function() {
  angular.module('voice-signup').controller('welcome_Ctrl', [
    '$scope', '$state', 'decoration_factory', 'Fields_factory', function($scope, $state, decorations, fields_fact) {
      var changeImg, changeNextImg, commands, current, init, maxPic, minPic, next, reveal, transition;
      $scope.decoration = decorations.text;
      $scope.images = [
        {
          title: 'Pelican',
          ext: 'png'
        }, {
          title: 'Pelican',
          ext: 'png'
        }, {
          title: 'Pelican',
          ext: 'png'
        }, {
          title: 'Pelican',
          ext: 'png'
        }, {
          title: 'Pelican',
          ext: 'png'
        }, {
          title: 'Chatois',
          ext: 'webp'
        }, {
          title: 'Chatois',
          ext: 'webp'
        }, {
          title: 'Chatois',
          ext: 'webp'
        }
      ];
      minPic = 1;
      maxPic = 8;
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
      changeImg = function(attr) {
        var list;
        list = document.querySelectorAll("div[image]");
        return [].forEach.call(list, (function(el) {
          var url;
          url = "./res/Screenshot_" + $scope.picIndex + "." + $scope.images[$scope.picIndex - 1].ext;
          return el.style.backgroundImage = "url('" + url + "')";
        }));
      };
      changeNextImg = function(attr) {
        var list;
        list = document.querySelectorAll("div[imageNext]");
        return [].forEach.call(list, (function(el) {
          var url;
          url = "./res/Screenshot_" + $scope.nextPicIndex() + "." + $scope.images[$scope.nextPicIndex() - 1].ext;
          return el.style.backgroundImage = "url('" + url + "')";
        }));
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
          changeImg();
          current.className = current.className.replace(" isSliding", "");
          next.className = next.className.replace(" isSliding", "");
          return changeNextImg();
        }, 300);
      };
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
          return $state.go("sign-up", null, {
            reload: true
          });
        }, 1000);
      };
      commands = {
        "sign me up": function() {
          return transition();
        },
        "test": function() {
          return alert("working");
        }
      };
      reveal = function() {
        return setTimeout(function() {
          var cl;
          cl = document.getElementsByClassName("js-monitor")[0].className;
          document.getElementsByClassName("js-monitor")[0].className = cl.replace("isTransitioning", '');
          return setTimeout(function() {
            return document.getElementsByClassName("js-monitor")[0].className += "welccome";
          }, 200);
        }, 500);
      };
      init = function() {
        var x;
        console.log("initing");
        reveal();
        annyang.addCommands(commands);
        annyang.start();
        $scope.slide();
        clearInterval(window.timer);
        x = 0;
        return window.timer = setInterval(function() {
          x++;
          console.log("interval " + x);
          return $scope.slide();
        }, 3000);
      };
      return init();
    }
  ]);

}).call(this);
