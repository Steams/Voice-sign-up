require('../../lib/annyang.min.js')
#formComp = require('./components/form_component')

angular.module "voice-signup"
    .controller 'sign-up_Ctrl',['$scope','Fields_factory',($scope,fields_fact)->
        $scope.thing ="checking"
        $scope.word = ""
        $scope.keyboard = {
            rows : [
                {
                    rowNumber:1,
                    rowKeys:[
                        {keyValue:"q", keyClass:"", keyMod:""},
                        {keyValue:"w", keyClass:"", keyMod:""},
                        {keyValue:"e", keyClass:"", keyMod:""},
                        {keyValue:"r", keyClass:"", keyMod:""},
                        {keyValue:"t", keyClass:"", keyMod:""},
                        {keyValue:"y", keyClass:"", keyMod:""},
                        {keyValue:"u", keyClass:"", keyMod:""},
                        {keyValue:"i", keyClass:"", keyMod:""},
                        {keyValue:"o", keyClass:"", keyMod:""},
                        {keyValue:"p", keyClass:"", keyMod:""},
                    ]
                },
                {
                    rowNumber:2,
                    rowKeys:[
                        {keyValue:"a", keyClass:"", keyMod:""},
                        {keyValue:"s", keyClass:"", keyMod:""},
                        {keyValue:"d", keyClass:"", keyMod:""},
                        {keyValue:"f", keyClass:"", keyMod:""},
                        {keyValue:"g", keyClass:"", keyMod:""},
                        {keyValue:"h", keyClass:"", keyMod:""},
                        {keyValue:"j", keyClass:"", keyMod:""},
                        {keyValue:"k", keyClass:"", keyMod:""},
                        {keyValue:"l", keyClass:"", keyMod:""},
                    ]
                },
                {
                    rowNumber:3,
                    rowKeys:[
                        {keyValue:"^", keyClass:"", keyMod:""},
                        {keyValue:"z", keyClass:"", keyMod:""},
                        {keyValue:"x", keyClass:"", keyMod:""},
                        {keyValue:"c", keyClass:"", keyMod:""},
                        {keyValue:"v", keyClass:"", keyMod:""},
                        {keyValue:"b", keyClass:"", keyMod:""},
                        {keyValue:"n", keyClass:"", keyMod:""},
                        {keyValue:"m", keyClass:"", keyMod:""},
                        {keyValue:",", keyClass:"", keyMod:""},
                        {keyValue:".", keyClass:"", keyMod:""},
                        {keyValue:"<--", keyClass:"", keyMod:""},
                    ]
                },
                {
                    rowNumber:4,
                    rowKeys:[
                        {keyValue:" ", keyClass:"mod-space", keyMod:""},
                    ]
                }
            ]
            
        }

        $scope.label = "start"

        $scope.unPress = (key)->
            for x in [0...$scope.keyboard.rows.length] by 1
                row = $scope.keyboard.rows[x]
                for i in [0...row.rowKeys.length] by 1
                    k = row.rowKeys[i].keyValue
                    if(k == key || k.toUpperCase() == key)
                        console.log $scope.keyboard.rows[x].rowKeys[i].keyValue
                        $scope.keyboard.rows[x].rowKeys[i].keyMod = ""
                        $scope.$apply()

        $scope.space = ()->
            $scope.$apply()
            $scope.word += " "
            setTimeout(()->
                $scope.unPress(" ")
            ,200
            )

        $scope.backspace = ()->
                $scope.$apply()
                $scope.word = $scope.word.slice(0,-1)
                setTimeout(()->
                    $scope.unPress("<--")
                ,200
                )

        $scope.press = (key)->
            for x in [0...$scope.keyboard.rows.length] by 1
                row = $scope.keyboard.rows[x]
                for i in [0...row.rowKeys.length] by 1
                    k = row.rowKeys[i].keyValue
                    if(k == key || k.toUpperCase() == key)
                        console.log $scope.keyboard.rows[x].rowKeys[i].keyValue
                        $scope.keyboard.rows[x].rowKeys[i].keyMod = "pressed"
                        if(key == "<--")
                            console.log "backspace"
                            $scope.backspace()
                            return 0
                        if(key == " ")
                            $scope.space()
                            return 0
                        $scope.word += key
                        setTimeout(()->
                            $scope.unPress(key)
                        ,200
                        )
                        $scope.$apply()

        $scope.type = (word)->
            console.log "typing "+word
            x =0
            l = word.length
            typeSpeed = setInterval(()->
                if(x < l)
                    c = word.charAt(x)
                    console.log "typing "+c
                    $scope.press(c)
                    x++
                else
                    clearInterval(typeSpeed)
            ,100
            )

        $scope.fields = ()-> return fields_fact.fields
        $scope.init = ()->
            $scope.current_field = fields_fact.active()
            # should trigger the layout to play into animations
            
        $scope.process = (field)->
            $scope.label = field.name
            return 0
            #animate in

        $scope.init()
        x = 0
        $scope.start = ()->
            console.log "starting"
            $scope.label = fields_fact.active().name
            fields_fact.getNext()
            console.log fields_fact.getIndex()

        $scope.undo = ()->
            console.log "ndoing"
            x = 0
            l = $scope.word.length
            typeSpeed = setInterval(()->
                console.log "interval"
                if(x < l)
                    $scope.press("<--")
                else
                    clearInterval(typeSpeed)
                    $scope.unPress("<--")
                x++
                $scope.$apply()
            ,150
            )

        commands = {
            'next' : ()->
                console.log "called"
                $scope.start()
                $scope.$apply()

            'one' :()->
                alert("works")

            'type *name': (name)->
                console.log "typing"
                $scope.type(name)

            'undo': ()->
                $scope.undo()
                $scope.$apply()

        }

        #setTimeout(()->
            #$scope.type("Radcliffe")
        #,1000
        #)

        document.getElementById("prompt-input").onkeydown = (evt)->
            evt = evt || window.event
            charCode = evt.keyCode || evt.which
            console.log charCode
            switch charCode
                when 8 then (evt.preventDefault()
                $scope.press("<--")
                )


        document.onkeypress = (evt)->
            evt.preventDefault()
            evt = evt || window.event
            charCode = evt.keyCode || evt.which
            console.log charCode
            charStr = String.fromCharCode(charCode)
            $scope.press(charStr)
        
        annyang.addCommands(commands)
        annyang.start()

]
