require('../../lib/annyang.min.js')

angular.module "voice-signup"
.controller 'sign-up_Ctrl',['$scope','$state','Fields_factory','keyboard_factory','SaveMember',($scope,$state,fields_fact,keyboard_factory,SaveMember)->

    console.log("Sign up please")

    $scope.member = {}
    commands = {
        'test' :()->
            alert("works")

        'next' : ()->
            console.log "called"
            $scope.next()
            $scope.$apply()

        'type *word': (word)->
            console.log "typing"
            $scope.type(word,true)

        'undo': ()->
            $scope.undo()
            $scope.$apply()
    }


    input = (char)->
        $scope.word += char

    unInput = (length)->
        $scope.word = $scope.word.slice(0,-length)


    press = (key,shouldInput)->
        for x in [0...$scope.keyboard.rows.length] by 1
            row = $scope.keyboard.rows[x]
            for i in [0...row.rowKeys.length] by 1
                k = row.rowKeys[i].keyValue
                if(k == key || k.toUpperCase() == key)
                    # console.log $scope.keyboard.rows[x].rowKeys[i].keyValue
                    $scope.keyboard.rows[x].rowKeys[i].keyMod = "pressed"
                    if(key == "<")
                        console.log "backspace"
                        $scope.backspace()
                        return 0
                    if(key == " ")
                        $scope.space()
                        return 0
                    setTimeout(()->
                        $scope.unPress(key)
                    ,250
                    )
                    break
        if(shouldInput)
            input(key)
        $scope.$apply()

    unPress = (key)->
        for x in [0...$scope.keyboard.rows.length] by 1
            row = $scope.keyboard.rows[x]
            # console.log row
            for i in [0...row.rowKeys.length] by 1
                k = row.rowKeys[i].keyValue
                if(k == key || k.toUpperCase() == key)
                    # console.log $scope.keyboard.rows[x].rowKeys[i].keyValue
                    $scope.keyboard.rows[x].rowKeys[i].keyMod = ""
                    $scope.$apply()

    undo = ()->
        # console.log "undoing"
        x = 0
        l = $scope.word.length
        typeSpeed = setInterval(()->
            console.log "interval"
            if(x < l)
                $scope.press("<")
            else
                clearInterval(typeSpeed)
            x++
            $scope.$apply()
        ,150
        )

    space = ()->
        $scope.word += " "
        setTimeout(()->
            $scope.unPress(" ")
        ,200
        )

    backspace = ()->
            unInput(1)
            setTimeout(()->
                $scope.unPress("<")
            ,200
            )

    modify = (word)->
        word = word.replace(" @ ","@")
        word = word.replace(" at ","@")
        word = word.replace(" At ","@")
        word = word.replace(" AT ","@")
        word = if word.endsWith(".com") then word.replace(/ /g,'').toLowerCase() else word
        return word

    type = (word,shouldInput)->
        document.getElementById("prompt-input").focus()
        word = modify(word)
        console.log "typing "+word
        current_index = 0
        length = word.length
        typeSpeed = setInterval(()->
            if(current_index < length)
                c = word.charAt(current_index)
                $scope.press(c,shouldInput)
                current_index++
            else
                clearInterval(typeSpeed)
        ,100
        )

    process = (field,value)->
        $scope.previous.push({name:field,value:value})
        $scope.member[field] = value
        $scope.$apply()
        console.log $scope.member
        return 0

    next = ()->
        $scope.count++
        process($scope.field.name,$scope.word)
        $scope.field = fields_fact.getNext()
        if($scope.count > 4)
            $scope.done = true
            SaveMember($scope.member)
            $scope.thanks($scope.member.name)
           # transition to congratulations
        $scope.word = ""

    document.getElementById("prompt-input").onkeydown = (evt)->
        evt = evt || window.event
        charCode = evt.keyCode || evt.which
        # console.log charCode
        switch charCode
            when 8 then ( evt.preventDefault()
            $scope.press("<")
            )

    document.onkeypress = (evt)->
        # evt.preventDefault()
        evt = evt || window.event
        charCode = evt.keyCode || evt.which
        if(charCode == 13)
            console.log evt.target.className
            if(evt.target.className != 'js-fields-item-input')
                $scope.next()
                $scope.$apply()
        console.log charCode
        charStr = String.fromCharCode(charCode)
        $scope.press(charStr)


    animateIn = (x,i)->
        # console.log $scope.keyboard.rows[x].rowKeys[i].keyValue
        vm = Math.floor Math.random() * 1000
        # console.log vm
        setTimeout ->
            # console.log ""+x+" "+i
            $scope.keyboard.rows[x].rowKeys[i].keyMod ="key-intro"
            # console.log "changed"
            $scope.$apply()
        ,vm

    intro = ()->
        # console.log $scope.keyboard.rows
        for x in [0...$scope.keyboard.rows.length] by 1
            # console.log x
            row = $scope.keyboard.rows[x]
            for i in [0...row.rowKeys.length] by 1
                $scope.animateIn(x,i)

    unIntro = ()->
        for x in [0...$scope.keyboard.rows.length] by 1
            # console.log x
            row = $scope.keyboard.rows[x]
            for i in [0...row.rowKeys.length] by 1
                $scope.keyboard.rows[x].rowKeys[i].keyMod ="key-intro"


    reveal = ()->
        setTimeout(()->
            cl = document.getElementsByClassName("js-monitor")[0].className
            document.getElementsByClassName("js-monitor")[0].className = cl.replace("isTransitioning",'')
            setTimeout(()->
                document.getElementsByClassName("js-monitor")[0].className += "sign-up"
            ,200
            )
        ,500
        )

    goToThanks = ()->
        document.getElementsByClassName("js-monitor")[0].className += " isTransitioning"
        setTimeout( ()->
            $state.go("thanks")
        ,1000
        )

    init = ()->
        # $scope.unIntro()
        annyang.addCommands(commands)
        annyang.start()
        # setTimeout(()->
        #     $scope.type("Radcliffe at RObinson",true)
        # ,1500
        # )
        $scope.reveal()
        setTimeout ->
            $scope.intro()
        ,1000
        document.getElementById("prompt-input").focus()

    $scope.keyboard = keyboard_factory.keyboard
    $scope.done = false
    $scope.count = 0
    $scope.reveal = reveal
    $scope.word = ""
    $scope.previous = []
    $scope.unPress = unPress
    $scope.press = press
    $scope.undo = undo
    $scope.space = space
    $scope.backspace = backspace
    $scope.type = type
    $scope.field = fields_fact.getNext()
    $scope.intro = intro
    $scope.unIntro = unIntro
    $scope.animateIn = animateIn
    $scope.next = next
    $scope.thanks = goToThanks

    init()
    return 0
]
