angular.module 'voice-signup'
.factory 'keyboard_factory',[()->
    factory = this
    factory.keyboard = {
        rows : [
            {
                rowNumber:1,
                rowKeys:[
                    {keyValue:"q", keyClass:"", keyMod:"invis"},
                    {keyValue:"w", keyClass:"", keyMod:"invis"},
                    {keyValue:"e", keyClass:"", keyMod:"invis"},
                    {keyValue:"r", keyClass:"", keyMod:"invis"},
                    {keyValue:"t", keyClass:"", keyMod:"invis"},
                    {keyValue:"y", keyClass:"", keyMod:"invis"},
                    {keyValue:"u", keyClass:"", keyMod:"invis"},
                    {keyValue:"i", keyClass:"", keyMod:"invis"},
                    {keyValue:"o", keyClass:"", keyMod:"invis"},
                    {keyValue:"p", keyClass:"", keyMod:"invis"},
                ]
            },
            {
                rowNumber:2,
                rowKeys:[
                    {keyValue:"a", keyClass:"", keyMod:"invis"},
                    {keyValue:"s", keyClass:"", keyMod:"invis"},
                    {keyValue:"d", keyClass:"", keyMod:"invis"},
                    {keyValue:"f", keyClass:"", keyMod:"invis"},
                    {keyValue:"g", keyClass:"", keyMod:"invis"},
                    {keyValue:"h", keyClass:"", keyMod:"invis"},
                    {keyValue:"j", keyClass:"", keyMod:"invis"},
                    {keyValue:"k", keyClass:"", keyMod:"invis"},
                    {keyValue:"l", keyClass:"", keyMod:"invis"},
                ]
            },
            {
                rowNumber:3,
                rowKeys:[
                    {keyValue:"^", keyClass:"", keyMod:"invis"},
                    {keyValue:"z", keyClass:"", keyMod:"invis"},
                    {keyValue:"x", keyClass:"", keyMod:"invis"},
                    {keyValue:"c", keyClass:"", keyMod:"invis"},
                    {keyValue:"v", keyClass:"", keyMod:"invis"},
                    {keyValue:"b", keyClass:"", keyMod:"invis"},
                    {keyValue:"n", keyClass:"", keyMod:"invis"},
                    {keyValue:"m", keyClass:"", keyMod:"invis"},
                    {keyValue:",", keyClass:"", keyMod:"invis"},
                    {keyValue:".", keyClass:"", keyMod:"invis"},
                    {keyValue:"<", keyClass:"", keyMod:"invis"},
                ]
            },
            {
                rowNumber:4,
                rowKeys:[
                    {keyValue:" ", keyClass:"mod-space", keyMod:"invis"},
                ]
            }
        ]

        }
    return factory

    ]
