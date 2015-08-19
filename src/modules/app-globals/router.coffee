angular.module 'voice-signup'
    .config ($stateProvider) ->
        $stateProvider
            .state('welcome',{
            url:''
            templateUrl: '/app/modules/welcome/welcome.html'
            controller:"welcome_Ctrl"
            })
            .state('sign-up',{
                url:'/sign-up'
                templateUrl: '/app/modules/sign-up/sign-up.html'
                controller:"sign-up_Ctrl"
            })
            .state('thanks',{
                url:'/thanks'
                templateUrl: '/app/modules/thanks/thanks.html'
                controller:"thanks_Ctrl"
            })
