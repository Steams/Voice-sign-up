(function() {
  require('../../lib/annyang.min.js');

  angular.module("voice-signup").controller('sign-up_Ctrl', [
    '$scope', 'Fields_factory', function($scope, fields_fact) {
      var commands, x;
      $scope.thing = "checking";
      $scope.word = "";
      $scope.keyboard = {
        rows: [
          {
            rowNumber: 1,
            rowKeys: [
              {
                keyValue: "q",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "w",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "e",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "r",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "t",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "y",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "u",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "i",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "o",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "p",
                keyClass: "",
                keyMod: ""
              }
            ]
          }, {
            rowNumber: 2,
            rowKeys: [
              {
                keyValue: "a",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "s",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "d",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "f",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "g",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "h",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "j",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "k",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "l",
                keyClass: "",
                keyMod: ""
              }
            ]
          }, {
            rowNumber: 3,
            rowKeys: [
              {
                keyValue: "^",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "z",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "x",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "c",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "v",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "b",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "n",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "m",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: ",",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: ".",
                keyClass: "",
                keyMod: ""
              }, {
                keyValue: "<--",
                keyClass: "",
                keyMod: ""
              }
            ]
          }, {
            rowNumber: 4,
            rowKeys: [
              {
                keyValue: " ",
                keyClass: "mod-space",
                keyMod: ""
              }
            ]
          }
        ]
      };
      $scope.label = "start";
      $scope.unPress = function(key) {
        var i, j, k, ref, results, row, x;
        results = [];
        for (x = j = 0, ref = $scope.keyboard.rows.length; j < ref; x = j += 1) {
          row = $scope.keyboard.rows[x];
          results.push((function() {
            var m, ref1, results1;
            results1 = [];
            for (i = m = 0, ref1 = row.rowKeys.length; m < ref1; i = m += 1) {
              k = row.rowKeys[i].keyValue;
              if (k === key || k.toUpperCase() === key) {
                console.log($scope.keyboard.rows[x].rowKeys[i].keyValue);
                $scope.keyboard.rows[x].rowKeys[i].keyMod = "";
                results1.push($scope.$apply());
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          })());
        }
        return results;
      };
      $scope.space = function() {
        $scope.$apply();
        $scope.word += " ";
        return setTimeout(function() {
          return $scope.unPress(" ");
        }, 200);
      };
      $scope.backspace = function() {
        $scope.$apply();
        $scope.word = $scope.word.slice(0, -1);
        return setTimeout(function() {
          return $scope.unPress("<--");
        }, 200);
      };
      $scope.press = function(key) {
        var i, j, k, m, ref, ref1, row, x;
        for (x = j = 0, ref = $scope.keyboard.rows.length; j < ref; x = j += 1) {
          row = $scope.keyboard.rows[x];
          for (i = m = 0, ref1 = row.rowKeys.length; m < ref1; i = m += 1) {
            k = row.rowKeys[i].keyValue;
            if (k === key || k.toUpperCase() === key) {
              console.log($scope.keyboard.rows[x].rowKeys[i].keyValue);
              $scope.keyboard.rows[x].rowKeys[i].keyMod = "pressed";
              if (key === "<--") {
                console.log("backspace");
                $scope.backspace();
                return 0;
              }
              if (key === " ") {
                $scope.space();
                return 0;
              }
              $scope.word += key;
              setTimeout(function() {
                return $scope.unPress(key);
              }, 200);
              $scope.$apply();
            }
          }
        }
      };
      $scope.type = function(word) {
        var l, typeSpeed, x;
        console.log("typing " + word);
        x = 0;
        l = word.length;
        return typeSpeed = setInterval(function() {
          var c;
          if (x < l) {
            c = word.charAt(x);
            console.log("typing " + c);
            $scope.press(c);
            return x++;
          } else {
            return clearInterval(typeSpeed);
          }
        }, 100);
      };
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
      $scope.undo = function() {
        var l, typeSpeed;
        console.log("ndoing");
        x = 0;
        l = $scope.word.length;
        return typeSpeed = setInterval(function() {
          console.log("interval");
          if (x < l) {
            $scope.press("<--");
          } else {
            clearInterval(typeSpeed);
            $scope.unPress("<--");
          }
          x++;
          return $scope.$apply();
        }, 150);
      };
      commands = {
        'next': function() {
          console.log("called");
          $scope.start();
          return $scope.$apply();
        },
        'one': function() {
          return alert("works");
        },
        'type *name': function(name) {
          console.log("typing");
          return $scope.type(name);
        },
        'undo': function() {
          $scope.undo();
          return $scope.$apply();
        }
      };
      document.getElementById("prompt-input").onkeydown = function(evt) {
        var charCode;
        evt = evt || window.event;
        charCode = evt.keyCode || evt.which;
        console.log(charCode);
        switch (charCode) {
          case 8:
            evt.preventDefault();
            return $scope.press("<--");
        }
      };
      document.onkeypress = function(evt) {
        var charCode, charStr;
        evt.preventDefault();
        evt = evt || window.event;
        charCode = evt.keyCode || evt.which;
        console.log(charCode);
        charStr = String.fromCharCode(charCode);
        return $scope.press(charStr);
      };
      annyang.addCommands(commands);
      return annyang.start();
    }
  ]);

}).call(this);
