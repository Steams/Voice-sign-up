(function() {
  require('../../lib/annyang.min.js');

  angular.module("voice-signup").controller('sign-up_Ctrl', [
    '$scope', 'Fields_factory', 'keyboard_factory', function($scope, fields_fact, keyboard_factory) {
      var animateIn, backspace, commands, init, input, intro, modify, next, press, process, reveal, space, type, unInput, unIntro, unPress, undo;
      commands = {
        'test': function() {
          return alert("works");
        },
        'next': function() {
          console.log("called");
          $scope.next();
          return $scope.$apply();
        },
        'type *word': function(word) {
          console.log("typing");
          return $scope.type(word, true);
        },
        'undo': function() {
          $scope.undo();
          return $scope.$apply();
        }
      };
      input = function(char) {
        return $scope.word += char;
      };
      unInput = function(length) {
        return $scope.word = $scope.word.slice(0, -length);
      };
      press = function(key, shouldInput) {
        var i, j, k, m, ref, ref1, row, x;
        for (x = j = 0, ref = $scope.keyboard.rows.length; j < ref; x = j += 1) {
          row = $scope.keyboard.rows[x];
          for (i = m = 0, ref1 = row.rowKeys.length; m < ref1; i = m += 1) {
            k = row.rowKeys[i].keyValue;
            if (k === key || k.toUpperCase() === key) {
              $scope.keyboard.rows[x].rowKeys[i].keyMod = "pressed";
              if (key === "<") {
                console.log("backspace");
                $scope.backspace();
                return 0;
              }
              if (key === " ") {
                $scope.space();
                return 0;
              }
              setTimeout(function() {
                return $scope.unPress(key);
              }, 250);
              break;
            }
          }
        }
        if (shouldInput) {
          input(key);
        }
        return $scope.$apply();
      };
      unPress = function(key) {
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
      undo = function() {
        var l, typeSpeed, x;
        x = 0;
        l = $scope.word.length;
        return typeSpeed = setInterval(function() {
          console.log("interval");
          if (x < l) {
            $scope.press("<");
          } else {
            clearInterval(typeSpeed);
          }
          x++;
          return $scope.$apply();
        }, 150);
      };
      space = function() {
        $scope.word += " ";
        return setTimeout(function() {
          return $scope.unPress(" ");
        }, 200);
      };
      backspace = function() {
        unInput(1);
        return setTimeout(function() {
          return $scope.unPress("<");
        }, 200);
      };
      modify = function(word) {
        word = word.replace(" @ ", "@");
        word = word.replace(" at ", "@");
        word = word.replace(" At ", "@");
        word = word.replace(" AT ", "@");
        word = word.endsWith(".com") ? word.replace(/ /g, '').toLowerCase() : word;
        return word;
      };
      type = function(word, shouldInput) {
        var current_index, length, typeSpeed;
        document.getElementById("prompt-input").focus();
        word = modify(word);
        console.log("typing " + word);
        current_index = 0;
        length = word.length;
        return typeSpeed = setInterval(function() {
          var c;
          if (current_index < length) {
            c = word.charAt(current_index);
            $scope.press(c, shouldInput);
            return current_index++;
          } else {
            return clearInterval(typeSpeed);
          }
        }, 100);
      };
      process = function(field, value) {
        $scope.previous.push({
          name: field,
          value: value
        });
        $scope.$apply();
        return 0;
      };
      next = function() {
        $scope.count++;
        process($scope.field.name, $scope.word);
        $scope.field = fields_fact.getNext();
        if ($scope.count > 4) {
          $scope.done = true;
        }
        return $scope.word = "";
      };
      document.getElementById("prompt-input").onkeydown = function(evt) {
        var charCode;
        evt = evt || window.event;
        charCode = evt.keyCode || evt.which;
        switch (charCode) {
          case 8:
            evt.preventDefault();
            return $scope.press("<");
        }
      };
      document.onkeypress = function(evt) {
        var charCode, charStr;
        evt = evt || window.event;
        charCode = evt.keyCode || evt.which;
        if (charCode === 13) {
          console.log(evt.target.className);
          if (evt.target.className !== 'js-fields-item-input') {
            $scope.next();
            $scope.$apply();
          }
        }
        console.log(charCode);
        charStr = String.fromCharCode(charCode);
        return $scope.press(charStr);
      };
      animateIn = function(x, i) {
        var vm;
        vm = Math.floor(Math.random() * 1000);
        return setTimeout(function() {
          $scope.keyboard.rows[x].rowKeys[i].keyMod = "key-intro";
          return $scope.$apply();
        }, vm);
      };
      intro = function() {
        var i, j, ref, results, row, x;
        results = [];
        for (x = j = 0, ref = $scope.keyboard.rows.length; j < ref; x = j += 1) {
          row = $scope.keyboard.rows[x];
          results.push((function() {
            var m, ref1, results1;
            results1 = [];
            for (i = m = 0, ref1 = row.rowKeys.length; m < ref1; i = m += 1) {
              results1.push($scope.animateIn(x, i));
            }
            return results1;
          })());
        }
        return results;
      };
      unIntro = function() {
        var i, j, ref, results, row, x;
        results = [];
        for (x = j = 0, ref = $scope.keyboard.rows.length; j < ref; x = j += 1) {
          row = $scope.keyboard.rows[x];
          results.push((function() {
            var m, ref1, results1;
            results1 = [];
            for (i = m = 0, ref1 = row.rowKeys.length; m < ref1; i = m += 1) {
              results1.push($scope.keyboard.rows[x].rowKeys[i].keyMod = "key-intro");
            }
            return results1;
          })());
        }
        return results;
      };
      reveal = function() {
        return setTimeout(function() {
          var cl;
          cl = document.getElementsByClassName("js-monitor")[0].className;
          return document.getElementsByClassName("js-monitor")[0].className = cl.replace("isTransitioning", '');
        }, 500);
      };
      init = function() {
        annyang.addCommands(commands);
        annyang.start();
        $scope.reveal();
        setTimeout(function() {
          return $scope.intro();
        }, 1000);
        return document.getElementById("prompt-input").focus();
      };
      $scope.keyboard = keyboard_factory.keyboard;
      $scope.done = false;
      $scope.count = 0;
      $scope.reveal = reveal;
      $scope.word = "";
      $scope.previous = [];
      $scope.unPress = unPress;
      $scope.press = press;
      $scope.undo = undo;
      $scope.space = space;
      $scope.backspace = backspace;
      $scope.type = type;
      $scope.field = fields_fact.getNext();
      $scope.intro = intro;
      $scope.unIntro = unIntro;
      $scope.animateIn = animateIn;
      $scope.next = next;
      init();
      return 0;
    }
  ]);

}).call(this);
