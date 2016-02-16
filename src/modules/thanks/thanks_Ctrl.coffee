angular.module "voice-signup"
.controller "thanks_Ctrl",["$scope","$state",($scope,$state)->
    console.log("Thanks")

    goToWelcome = ()->
        document.getElementsByClassName("js-monitor")[0].className += " isTransitioning"
        setTimeout( ()->
            console.log("going to welcome")
            $state.go("welcome")
        ,1000
        )


    reveal = ()->
        setTimeout(()->
            cl = document.getElementsByClassName("js-monitor")[0].className
            document.getElementsByClassName("js-monitor")[0].className = cl.replace("isTransitioning",'')
            setTimeout(()->
                document.getElementsByClassName("js-monitor")[0].className += "thanks"
            ,200
            )
        ,500
        )

    init = ()->
        reveal()

    init();
    setTimeout( ()->
      goToWelcome()
    ,3000
    )
  ]
