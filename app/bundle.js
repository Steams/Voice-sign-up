(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
//! annyang
//! version : 2.0.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
(function(a){"use strict";var b=this,c=b.SpeechRecognition||b.webkitSpeechRecognition||b.mozSpeechRecognition||b.msSpeechRecognition||b.oSpeechRecognition;if(!c)return b.annyang=null,a;var d,e,f=[],g={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},h=0,i=!1,j="font-weight: bold; color: #00f;",k=!1,l=/\s*\((.*?)\)\s*/g,m=/(\(\?:[^)]+\))\?/g,n=/(\(\?)?:\w+/g,o=/\*\w+/g,p=/[\-{}\[\]+?.,\\\^$|#]/g,q=function(a){return a=a.replace(p,"\\$&").replace(l,"(?:$1)?").replace(n,function(a,b){return b?a:"([^\\s]+)"}).replace(o,"(.*?)").replace(m,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},r=function(a){var b=Array.prototype.slice.call(arguments,1);a.forEach(function(a){a.callback.apply(a.context,b)})},s=function(){t()||b.annyang.init({},!1)},t=function(){return d!==a},u=function(a,c,d){f.push({command:a,callback:c,originalPhrase:d}),i&&b.console.log("Command successfully loaded: %c"+d,j)};b.annyang={init:function(l,m){m=m===a?!0:!!m,d&&d.abort&&d.abort(),d=new c,d.maxAlternatives=5,d.continuous="http:"===b.location.protocol,d.lang="en-US",d.onstart=function(){r(g.start)},d.onerror=function(a){switch(r(g.error),a.error){case"network":r(g.errorNetwork);break;case"not-allowed":case"service-not-allowed":e=!1,r((new Date).getTime()-h<200?g.errorPermissionBlocked:g.errorPermissionDenied)}},d.onend=function(){if(r(g.end),e){var a=(new Date).getTime()-h;1e3>a?setTimeout(b.annyang.start,1e3-a):b.annyang.start()}},d.onresult=function(a){if(k)return i&&b.console.log("Speech heard, but annyang is paused"),!1;for(var c=a.results[a.resultIndex],d=[],e=0;e<c.length;e++)d[e]=c[e].transcript;r(g.result,d);for(var h,l=0;l<d.length;l++){h=d[l].trim(),i&&b.console.log("Speech recognized: %c"+h,j);for(var m=0,n=f.length;n>m;m++){var o=f[m].command.exec(h);if(o){var p=o.slice(1);return i&&(b.console.log("command matched: %c"+f[m].originalPhrase,j),p.length&&b.console.log("with parameters",p)),f[m].callback.apply(this,p),r(g.resultMatch,h,f[m].originalPhrase,d),!0}}}return r(g.resultNoMatch,d),!1},m&&(f=[]),l.length&&this.addCommands(l)},start:function(c){k=!1,s(),c=c||{},e=c.autoRestart!==a?!!c.autoRestart:!0,c.continuous!==a&&(d.continuous=!!c.continuous),h=(new Date).getTime();try{d.start()}catch(f){i&&b.console.log(f.message)}},abort:function(){e=!1,t&&d.abort()},pause:function(){k=!0},resume:function(){b.annyang.start()},debug:function(a){i=arguments.length>0?!!a:!0},setLanguage:function(a){s(),d.lang=a},addCommands:function(a){var c;s();for(var d in a)if(a.hasOwnProperty(d))if(c=b[a[d]]||a[d],"function"==typeof c)u(q(d),c,d);else{if(!("object"==typeof c&&c.regexp instanceof RegExp)){i&&b.console.log("Can not register command: %c"+d,j);continue}u(new RegExp(c.regexp.source,"i"),c.callback,d)}},removeCommands:function(b){return b===a?void(f=[]):(b=Array.isArray(b)?b:[b],void(f=f.filter(function(a){for(var c=0;c<b.length;c++)if(b[c]===a.originalPhrase)return!1;return!0})))},addCallback:function(c,d,e){if(g[c]!==a){var f=b[d]||d;"function"==typeof f&&g[c].push({callback:f,context:e||this})}}}}).call(this);

; browserify_shim__define__module__export__(typeof annyang != "undefined" ? annyang : window.annyang);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
(function() {
  angular.module("voice-signup").controller('global_Ctrl', ['$scope', '$state', function($scope, $state) {}]);

}).call(this);

},{}],4:[function(require,module,exports){
(function() {
  angular.module('voice-signup').service('SaveMember', [
    '$http', '$q', function($http, $q) {
      return function(member) {
        var defer, model;
        console.log(member);
        model = {
          "first_name": member['First Name'],
          "last_name": member['Last Name'],
          "email": member['Email address'],
          "interests": member['Interests']
        };
        console.log(model);
        defer = $q.defer();
        $http.post("http://localhost:3000/members", model).success(function(res) {
          return defer.resolve(res);
        }).error(function(err, status) {
          return defer.reject(err);
        });
        return defer.promise;
      };
    }
  ]);

}).call(this);

},{}],5:[function(require,module,exports){
(function() {
  angular.module('voice-signup').config(function($stateProvider) {
    return $stateProvider.state('welcome', {
      url: '/welcome',
      templateUrl: '/app/modules/welcome/welcome.html',
      controller: "welcome_Ctrl"
    }).state('sign-up', {
      url: '/sign-up',
      templateUrl: '/app/modules/sign-up/sign-up.html',
      controller: "sign-up_Ctrl",
      cache: false,
      reload: true
    }).state('thanks', {
      url: '/thanks',
      templateUrl: '/app/modules/thanks/thanks.html',
      controller: "thanks_Ctrl"
    });
  });

}).call(this);

},{}],6:[function(require,module,exports){
(function() {
  'use strict';
  var app;

  app = angular.module('voice-signup', ['ngRoute', 'ui.router', 'ngAnimate']);

  require('./module_app-globals');

  require('./module_sign-up');

  require('./module_welcome');

  require('./module_thanks');

}).call(this);

},{"./module_app-globals":7,"./module_sign-up":8,"./module_thanks":9,"./module_welcome":10}],7:[function(require,module,exports){
(function() {
  require('./app-globals/router');

  require('./app-globals/global_Ctrl');

  require('./app-globals/member_service');

  require('./app-globals/factories/fields_factory');

}).call(this);

},{"./app-globals/factories/fields_factory":2,"./app-globals/global_Ctrl":3,"./app-globals/member_service":4,"./app-globals/router":5}],8:[function(require,module,exports){
(function() {
  require("./sign-up/sign-up_Ctrl");

  require("./sign-up/keyboard_factory");

}).call(this);

},{"./sign-up/keyboard_factory":11,"./sign-up/sign-up_Ctrl":12}],9:[function(require,module,exports){
(function() {
  require("./thanks/thanks_Ctrl");

}).call(this);

},{"./thanks/thanks_Ctrl":13}],10:[function(require,module,exports){
(function() {
  require("./welcome/welcome_Ctrl");

  require("./welcome/decoration_factory");

}).call(this);

},{"./welcome/decoration_factory":14,"./welcome/welcome_Ctrl":15}],11:[function(require,module,exports){
(function() {
  angular.module('voice-signup').factory('keyboard_factory', [
    function() {
      var factory;
      factory = this;
      factory.keyboard = {
        rows: [
          {
            rowNumber: 1,
            rowKeys: [
              {
                keyValue: "q",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "w",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "e",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "r",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "t",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "y",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "u",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "i",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "o",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "p",
                keyClass: "",
                keyMod: "invis"
              }
            ]
          }, {
            rowNumber: 2,
            rowKeys: [
              {
                keyValue: "a",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "s",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "d",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "f",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "g",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "h",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "j",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "k",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "l",
                keyClass: "",
                keyMod: "invis"
              }
            ]
          }, {
            rowNumber: 3,
            rowKeys: [
              {
                keyValue: "^",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "z",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "x",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "c",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "v",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "b",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "n",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "m",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: ",",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: ".",
                keyClass: "",
                keyMod: "invis"
              }, {
                keyValue: "<",
                keyClass: "",
                keyMod: "invis"
              }
            ]
          }, {
            rowNumber: 4,
            rowKeys: [
              {
                keyValue: " ",
                keyClass: "mod-space",
                keyMod: "invis"
              }
            ]
          }
        ]
      };
      return factory;
    }
  ]);

}).call(this);

},{}],12:[function(require,module,exports){
(function() {
  require('../../lib/annyang.min.js');

  angular.module("voice-signup").controller('sign-up_Ctrl', [
    '$scope', '$state', 'Fields_factory', 'keyboard_factory', 'SaveMember', function($scope, $state, fields_fact, keyboard_factory, SaveMember) {
      var animateIn, backspace, commands, goToThanks, init, input, intro, modify, next, press, process, reveal, space, type, unInput, unIntro, unPress, undo;
      console.log("Sign up please");
      $scope.member = {};
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
        $scope.member[field] = value;
        $scope.$apply();
        console.log($scope.member);
        return 0;
      };
      next = function() {
        $scope.count++;
        process($scope.field.name, $scope.word);
        $scope.field = fields_fact.getNext();
        if ($scope.count > 4) {
          $scope.done = true;
          SaveMember($scope.member);
          $scope.thanks($scope.member.name);
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
          document.getElementsByClassName("js-monitor")[0].className = cl.replace("isTransitioning", '');
          return setTimeout(function() {
            return document.getElementsByClassName("js-monitor")[0].className += "sign-up";
          }, 200);
        }, 500);
      };
      goToThanks = function() {
        document.getElementsByClassName("js-monitor")[0].className += " isTransitioning";
        return setTimeout(function() {
          return $state.go("thanks");
        }, 1000);
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
      $scope.thanks = goToThanks;
      init();
      return 0;
    }
  ]);

}).call(this);

},{"../../lib/annyang.min.js":1}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
(function() {
  angular.module("voice-signup").factory('decoration_factory', [
    function() {
      var factory;
      factory = this;
      factory.text = "object merge_sort extends App{ def mergeSort(xs:List[Int]):List[Int] = { def merge( xs:List[Int], ys:List[Int]):List[Int] = { var breakOuter:Boolean = false var breakInner:Boolean = false var outerCount:Int = 0 var i = 0; val zs = for( n <- xs; outerCount:Int = outerCount + 1; if(!breakOuter); innerCount = i; merged = 0; k <-ys; breakI = breakInner; if(!breakI) ) yield { i = i +  1 if(n > k){ if(outerCount == xs.length){ n :: ys } else{ breakInner = true n } } else{ if(innerCount == ys.length){ breakOuter = true k :: xs }else{ k } } } val res = zs.foreach( s => for(n <- s) yield { n.asInstanceOf[Int] }) res } def sort(xs:List[Int]):List[Int] = { if(xs.length > 1){ merge(sort(xs.take(xs.length/2)),sort(xs.drop(xs.length/2))) }else{ xs } } sort(xs) } val xs = 2 ::3 :: 12 :: 3 :: 5 :: 10 :: Nil Console print mergeSort(xs); } object merge_sort extends App{ def mergeSort(xs:List[Int]):List[Int] = { def merge( xs:List[Int], ys:List[Int]):List[Int] = { var breakOuter:Boolean = false var breakInner:Boolean = false var outerCount:Int = 0 var i = 0; val zs = for( n <- xs; outerCount:Int = outerCount + 1; if(!breakOuter); innerCount = i; merged = 0; k <-ys; breakI = breakInner; if(!breakI) ) yield { i = i +  1 if(n > k){ if(outerCount == xs.length){ n :: ys } else{ breakInner = true n } } else{ if(innerCount == ys.length){ breakOuter = true k :: xs }else{ k } } } val res = zs.foreach( s => for(n <- s) yield { n.asInstanceOf[Int] }) res } def sort(xs:List[Int]):List[Int] = { if(xs.length > 1){ merge(sort(xs.take(xs.length/2)),sort(xs.drop(xs.length/2))) }else{ xs } } sort(xs) } val xs = 2 ::3 :: 12 :: 3 :: 5 :: 10 :: Nil Console print mergeSort(xs); } object merge_sort extends App{ def mergeSort(xs:List[Int]):List[Int] = { def merge( xs:List[Int], ys:List[Int]):List[Int] = { var breakOuter:Boolean = false var breakInner:Boolean = false var outerCount:Int = 0 var i = 0; val zs = for( n <- xs; outerCount:Int = outerCount + 1; if(!breakOuter); innerCount = i; merged = 0; k <-ys; breakI = breakInner; if(!breakI) ) yield { i = i +  1 if(n > k){ if(outerCount == xs.length){ n :: ys } else{ breakInner = true n } } else{ if(innerCount == ys.length){ breakOuter = true k :: xs }else{ k } } } val res = zs.foreach( s => for(n <- s) yield { n.asInstanceOf[Int] }) res } def sort(xs:List[Int]):List[Int] = { if(xs.length > 1){ merge(sort(xs.take(xs.length/2)),sort(xs.drop(xs.length/2))) }else{ xs } } sort(xs) } val xs = 2 ::3 :: 12 :: 3 :: 5 :: 10 :: Nil Console print mergeSort(xs); } object merge_sort extends App{ def mergeSort(xs:List[Int]):List[Int] = { def merge( xs:List[Int], ys:List[Int]):List[Int] = { var breakOuter:Boolean = false var breakInner:Boolean = false var outerCount:Int = 0 var i = 0; val zs = for( n <- xs; outerCount:Int = outerCount + 1; if(!breakOuter); innerCount = i; merged = 0; k <-ys; breakI = breakInner; if(!breakI) ) yield { i = i +  1 if(n > k){ if(outerCount == xs.length){ n :: ys } else{ breakInner = true n } } else{ if(innerCount == ys.length){ breakOuter = true k :: xs }else{ k } } } val res = zs.foreach( s => for(n <- s) yield { n.asInstanceOf[Int] }) res } def sort(xs:List[Int]):List[Int] = { if(xs.length > 1){ merge(sort(xs.take(xs.length/2)),sort(xs.drop(xs.length/2))) }else{ xs } } sort(xs) } val xs = 2 ::3 :: 12 :: 3 :: 5 :: 10 :: Nil Console print mergeSort(xs); object merge_sort extends App{ def mergeSort(xs:List[Int]):List[Int] = { def merge( xs:List[Int], ys:List[Int]):List[Int] = { var breakOuter:Boolean = false var breakInner:Boolean = false var outerCount:Int = 0 var i = 0; val zs = for( n <- xs; outerCount:Int = outerCount + 1; if(!breakOuter); innerCount = i; merged = 0; k <-ys; breakI = breakInner; if(!breakI) ) yield { i = i +  1 if(n > k){ if(outerCount == xs.length){ n :: ys } else{ breakInner = true n } } else{ if(innerCount == ys.length){ breakOuter = true k :: xs }else{ k } } } val res = zs.foreach( s => for(n <- s) yield { n.asInstanceOf[Int] }) res } def sort(xs:List[Int]):List[Int] = { if(xs.length > 1){ merge(sort(xs.take(xs.length/2)),sort(xs.drop(xs.length/2))) }else{ xs } } sort(xs) } val xs = 2 ::3 :: 12 :: 3 :: 5 :: 10 :: Nil Console print mergeSort(xs); } object merge_sort extends App{ def mergeSort(xs:List[Int]):List[Int] = { def merge( xs:List[Int], ys:List[Int]):List[Int] = { var breakOuter:Boolean = false var breakInner:Boolean = false var outerCount:Int = 0 var i = 0; val zs = for( n <- xs; outerCount:Int = outerCount + 1; if(!breakOuter); innerCount = i; merged = 0; k <-ys; breakI = breakInner; if(!breakI) ) yield { i = i +  1 if(n > k){ if(outerCount == xs.length){ n :: ys } else{ breakInner = true n } } else{ if(innerCount == ys.length){ breakOuter = true k :: xs }else{ k } } } val res = zs.foreach( s => for(n <- s) yield { n.asInstanceOf[Int] }) res } def sort(xs:List[Int]):List[Int] = { if(xs.length > 1){ merge(sort(xs.take(xs.length/2)),sort(xs.drop(xs.length/2))) }else{ xs } } sort(xs) } val xs = 2 ::3 :: 12 :: 3 :: 5 :: 10 :: Nil Console print mergeSort(xs); } }";
      return factory;
    }
  ]);

}).call(this);

},{}],15:[function(require,module,exports){
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

},{}]},{},[6]);
