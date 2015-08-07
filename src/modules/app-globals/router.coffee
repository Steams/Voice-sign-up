angular.module 'voice-signup'
    .config ($stateProvider) ->
        $stateProvider
            .state('base',{
            url:''
            templateUrl: '/app/modules/app-globals/partials/base.html'
            controller:"sign-up_Ctrl"
            })
