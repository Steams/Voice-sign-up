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

},{}],3:[function(require,module,exports){
(function() {
  angular.module('voice-signup').config(function($stateProvider) {
    return $stateProvider.state('base', {
      url: '',
      templateUrl: '/app/modules/app-globals/partials/base.html',
      controller: "sign-up_Ctrl"
    });
  });

}).call(this);

},{}],4:[function(require,module,exports){
(function() {
  'use strict';
  var app;

  app = angular.module('voice-signup', ['ngRoute', 'ui.router', 'react']);

  require('./module_app-globals');

  require('./module_sign-up');

  require('./testComp');

  require('./testCtrl');

}).call(this);

},{"./module_app-globals":5,"./module_sign-up":6,"./testComp":9,"./testCtrl":10}],5:[function(require,module,exports){
(function() {
  require('./app-globals/router');

  require('./app-globals/factories/fields_factory');

}).call(this);

},{"./app-globals/factories/fields_factory":2,"./app-globals/router":3}],6:[function(require,module,exports){
(function() {
  require("./sign-up/sign-up_Ctrl");

  require("./sign-up/components/form_component");

}).call(this);

},{"./sign-up/components/form_component":7,"./sign-up/sign-up_Ctrl":8}],7:[function(require,module,exports){
//var formInput = require('./formInput_comp');
//var formLabel = require('./formLabel_comp');
var formLabel = React.createClass({displayName: "formLabel",

    render: function() {
        return  (
            React.createElement("div", {className: "formlabel"}, 
                React.createElement("p", null, "Hl"), 
                React.createElement("p", null, "field is ", this.props.name)
            )
        );
    }

});

var formInput = React.createClass({displayName: "formInput",

    getInitialState: function() {
        return {value: ''};
    },

    handleChange: function(event){
        this.setState({value: event.target.value});
    },

    render: function() {
        return (
            React.createElement("div", {className: "formInput"}, 
                React.createElement("input", {type: "text", name: "input", value: value, onChange: this.handleChange})
            )
        );
    }
});

var formComp = React.createClass({displayName: "formComp",

    getInitialState: function() {   
        return {value: ''};
    },

    render: function(){
        return (
            React.createElement("div", {className: "form"}, 
                React.createElement("formLabel", {name: this.props.field.name}), 
                React.createElement("formInput", null)
            )
        );
    }
});

angular.module("voice-signup").directive('formComp',['reactDirective',function(reactDirective){
    return reactDirective(formComp,['field']);
}]);

},{}],8:[function(require,module,exports){
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

},{"../../lib/annyang.min.js":1}],9:[function(require,module,exports){
var newComp = React.createClass({displayName: "newComp",
    render : function(){
        return React.createElement("h2", null, "Hi from nested comp")
    }
})

angular.module("voice-signup").directive('newComp',['reactDirective',function(reactDirective){
    return reactDirective(newComp);
}]);

var testComp = React.createClass({displayName: "testComp",
    render: function() {
        return (
            React.createElement("newComp", null)
        )
    }
});

//angular.module("voice-signup").value('testComp',testComp);

angular.module("voice-signup").directive('testComp',['reactDirective',function(reactDirective){
    return reactDirective(testComp,['name']);
}]);

},{}],10:[function(require,module,exports){
(function() {
  angular.module("voice-signup").controller("testCtrl", [
    '$scope', function($scope) {
      $scope.obj = {
        name: "Skai"
      };
      return $scope.change = function() {
        $scope.obj.name = "Radcliffe";
        return console.log($scope.obj);
      };
    }
  ]);

}).call(this);

},{}]},{},[4]);
