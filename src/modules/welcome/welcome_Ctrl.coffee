angular.module 'voice-signup'
    .controller 'welcome_Ctrl',['$scope','$state','decoration_factory','Fields_factory',($scope,$state,decorations,fields_fact)->


        $scope.decoration = decorations.text
        $scope.images = [
            {
                title: 'Pelican'
                ext: 'png'
            },
            {
                title: 'Pelican'
                ext: 'png'
            },
            {
                title: 'Pelican'
                ext: 'png'
            },
            {
                title: 'Pelican'
                ext: 'png'
            },
            {
                title: 'Pelican'
                ext: 'png'
            },
            {
                title: 'Chatois'
                ext: 'webp'
            },
            {
                title: 'Chatois'
                ext: 'webp'
            },
            {
                title: 'Chatois'
                ext: 'webp'
            },

        ]
        minPic = 1
        maxPic = 8
        $scope.picIndex = minPic
        $scope.nextPicIndex = ()->
            return if $scope.picIndex+1 < maxPic+1 then $scope.picIndex+1 else minPic
        $scope.nextPic = ()->
           $scope.titleIndex = if $scope.titleIndex+1 < 3 then $scope.titleIndex+1 else 0
           $scope.picIndex = if $scope.picIndex+1 < maxPic+1 then $scope.picIndex+1 else minPic

        changeImg = (attr)->
            list = document.querySelectorAll("div[image]");
            [].forEach.call(list,((el)->
                url = "./res/Screenshot_"+$scope.picIndex+"."+$scope.images[$scope.picIndex-1].ext
                # console.log url
                el.style.backgroundImage="url('" + url + "')";
                ))

        changeNextImg = (attr)->
            list = document.querySelectorAll("div[imageNext]");
            [].forEach.call(list,((el)->
                url = "./res/Screenshot_"+$scope.nextPicIndex()+"."+$scope.images[$scope.nextPicIndex()-1].ext
                # console.log url
                el.style.backgroundImage="url('" + url + "')";
                ))

        current = document.getElementsByClassName("welcome-body-image")[0]
        next = document.getElementsByClassName("welcome-body-image")[1]
        $scope.slide = ()->
            console.log "sliding"
            current.className += " isSliding"
            next.className += " isSliding"
            setTimeout(()->
                $scope.nextPic()
                $scope.$apply()
                changeImg()
                current.className = current.className.replace(" isSliding","")
                next.className = next.className.replace(" isSliding","")
                changeNextImg()
            ,300
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
                $state.go("sign-up",null,{reload:true})
            ,1000
            )

        commands = {
            "sign me up": ()->
                transition()
            "test": ()->
                alert("working")
                #if(~className.indexOf('isTransitioning') )
                    #className = className 

                #$("js-monitor").toggleClass("isTransitioning")
        }

        reveal = ()->
            setTimeout(()->
                cl = document.getElementsByClassName("js-monitor")[0].className
                document.getElementsByClassName("js-monitor")[0].className = cl.replace("isTransitioning",'')
                setTimeout(()->
                    document.getElementsByClassName("js-monitor")[0].className += "welccome"
                ,200
                )
            ,500
            )

        init = ()->
            console.log "initing"
            reveal()
            annyang.addCommands(commands)
            annyang.start()
            $scope.slide()
            clearInterval(window.timer)
            x = 0
            window.timer = setInterval(()->
                x++
                console.log "interval "+x
                $scope.slide()
            ,3000
            )
        init()
    ]
