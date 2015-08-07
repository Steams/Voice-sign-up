require('../../lib/annyang.min.js')
#formComp = require('./components/form_component')

angular.module "voice-signup"
    .controller 'sign-up_Ctrl',['$scope','Fields_factory',($scope,fields_fact)->
        $scope.label = "start"
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

        commands = {
            'next' : ()->
                console.log "called"
                $scope.start()
                $scope.$apply()

            'one' :()->
                alert("works")

        }
        #annyang.addCommands(commands)
        #annyang.start()

]
