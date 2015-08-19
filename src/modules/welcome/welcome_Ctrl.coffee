angular.module 'voice-signup'
    .controller 'welcome_Ctrl',['$scope','$state','decoration_factory','Fields_factory',($scope,$state,decorations,fields_fact)->

        $scope.decoration = decorations.text
        $scope.titles = ["Pelican","Chatwa","UWI Maps"]
        $scope.titleIndex = 0
        minPic = 4
        maxPic = 13

        $scope.picIndex = minPic
        $scope.nextPicIndex = ()->
            return if $scope.picIndex+1 < maxPic+1 then $scope.picIndex+1 else minPic
        $scope.nextPic = ()->
           $scope.titleIndex = if $scope.titleIndex+1 < 3 then $scope.titleIndex+1 else 0
           $scope.picIndex = if $scope.picIndex+1 < maxPic+1 then $scope.picIndex+1 else minPic
            
            
        current = document.getElementsByClassName("welcome-body-image")[0]
        next = document.getElementsByClassName("welcome-body-image")[1]
        $scope.slide = ()->
            console.log "sliding"
            current.className += " isSliding"
            next.className += " isSliding"
            setTimeout(()->
                $scope.nextPic()
                $scope.$apply()
                current.className = current.className.replace(" isSliding","")
                next.className = next.className.replace(" isSliding","")
            ,300
            )
                

        setInterval(()->
            $scope.slide()
        ,3000
        )
        
        document.onkeypress = (evt)->
            evt = evt || window.event
            charCode = evt.keyCode || evt.which
            if(charCode == 13)
                transition()

        transition = ()->
            document.getElementsByClassName("js-monitor")[0].className += " isTransitioning"
            setTimeout( ()->
                fields_fact.refresh()
                $state.go("sign-up")
            ,1000
            )
        commands = {
            "sign me up": transition

                #if(~className.indexOf('isTransitioning') )
                    #className = className 

                #$("js-monitor").toggleClass("isTransitioning")
        }

        # annyang.addCommands(commands)
        # annyang.start()

    ]
