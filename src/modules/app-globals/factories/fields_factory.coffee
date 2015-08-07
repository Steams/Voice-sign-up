angular.module "voice-signup"
.factory 'Fields_factory',[()->
    factory = this
    factory.fields = [
        {name:"First Name"},
        {name:"Last Name"},
        {name:"Email address"},
        {name:"Interests"},
        {name:"Skills"},
    ]
    current_index = 0
    factory.active = () -> return this.fields[current_index]
    factory.getIndex = ()->
        return current_index

    factory.getNext = ()->
        current_index += 1
        return this.active()

    return factory
]
