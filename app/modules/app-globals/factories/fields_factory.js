(function() {
  angular.module("voice-signup").factory('Fields_factory', [
    function() {
      var current_index, factory;
      factory = this;
      factory.fields = [
        {
          name: "First Name"
        }, {
          name: "Last Name"
        }, {
          name: "Email address"
        }, {
          name: "Interests"
        }, {
          name: "Skills"
        }, {
          name: "Confirm"
        }
      ];
      current_index = 0;
      factory.getNext = function() {
        current_index += 1;
        return this.fields[current_index - 1];
      };
      factory.refresh = function() {
        return current_index = 0;
      };
      return factory;
    }
  ]);

}).call(this);
