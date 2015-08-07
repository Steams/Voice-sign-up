var newComp = React.createClass({displayName: "newComp",
    render : function(){
        return React.createElement("h2", null, "Hi from nested comp")
    }
})

angular.module("voice-signup").directive('newComp',['reactDirective',function(reactDirective){
    return reactDirective(newComp);
}]);

var testComp = React.createClass({displayName: "testComp",
    render: function() {
        return (
            React.createElement("newComp", null)
        )
    }
});

//angular.module("voice-signup").value('testComp',testComp);

angular.module("voice-signup").directive('testComp',['reactDirective',function(reactDirective){
    return reactDirective(testComp,['name']);
}]);
