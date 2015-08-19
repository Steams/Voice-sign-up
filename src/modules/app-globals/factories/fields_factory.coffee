angular.module "voice-signup"
.factory 'Fields_factory',[()->
    factory = this
    factory.fields = [
        {name:"First Name"},
        {name:"Last Name"},
        {name:"Email address"},
        {name:"Interests"},
        {name:"Skills"},
        {name:"Confirm"},
    ]
    current_index = 0

    factory.getNext = ()->
        current_index += 1
        return this.fields[current_index - 1]

    factory.refresh = ()->
        current_index = 0
        

    return factory
]
