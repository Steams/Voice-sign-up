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
