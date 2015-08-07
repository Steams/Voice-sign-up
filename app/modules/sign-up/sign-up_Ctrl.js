(function() {
  require('../../lib/annyang.min.js');

  angular.module("voice-signup").controller('sign-up_Ctrl', [
    '$scope', 'Fields_factory', function($scope, fields_fact) {
      var commands, x;
      $scope.label = "start";
      $scope.fields = function() {
        return fields_fact.fields;
      };
      $scope.init = function() {
        return $scope.current_field = fields_fact.active();
      };
      $scope.process = function(field) {
        $scope.label = field.name;
        return 0;
      };
      $scope.init();
      x = 0;
      $scope.start = function() {
        console.log("starting");
        $scope.label = fields_fact.active().name;
        fields_fact.getNext();
        return console.log(fields_fact.getIndex());
      };
      return commands = {
        'next': function() {
          console.log("called");
          $scope.start();
          return $scope.$apply();
        },
        'one': function() {
          return alert("works");
        }
      };
    }
  ]);

}).call(this);
