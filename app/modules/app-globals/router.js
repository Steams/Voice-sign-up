(function() {
  angular.module('voice-signup').config(function($stateProvider) {
    return $stateProvider.state('base', {
      url: '',
      templateUrl: '/app/modules/app-globals/partials/base.html',
      controller: "global_Ctrl"
    }).state('base.welcome', {
      url: '/welcome',
      templateUrl: '/app/modules/welcome/welcome.html',
      controller: "welcome_Ctrl"
    }).state('base.sign-up', {
      url: '/sign-up',
      templateUrl: '/app/modules/sign-up/partials/sign-up.html',
      controller: "sign-up_Ctrl"
    }).state('base.thanks', {
      url: '/thanks',
      templateUrl: '/app/modules/thansk/partials/thanks.html',
      controller: "thanks_Ctrl"
    });
  });

}).call(this);
