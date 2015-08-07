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
        }
      ];
      current_index = 0;
      factory.active = function() {
        return this.fields[current_index];
      };
      factory.getIndex = function() {
        return current_index;
      };
      factory.getNext = function() {
        current_index += 1;
        return this.active();
      };
      return factory;
    }
  ]);

}).call(this);
