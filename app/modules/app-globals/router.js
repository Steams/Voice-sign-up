(function() {
  angular.module('voice-signup').config(function($stateProvider) {
    return $stateProvider.state('base', {
      url: '',
      templateUrl: '/app/modules/app-globals/partials/base.html',
      controller: "sign-up_Ctrl"
    });
  });

}).call(this);
