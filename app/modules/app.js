(function() {
  'use strict';
  var app;

  app = angular.module('voice-signup', ['ngRoute', 'ui.router', 'react']);

  require('./module_app-globals');

  require('./module_sign-up');

  require('./testComp');

  require('./testCtrl');

}).call(this);