var newComp = React.createClass({
    render : function(){
        return <h2>Hi from nested comp</h2>
    }
})

angular.module("voice-signup").directive('newComp',['reactDirective',function(reactDirective){
    return reactDirective(newComp);
}]);

var testComp = React.createClass({
    render: function() {
        return (
            <newComp />
        )
    }
});

//angular.module("voice-signup").value('testComp',testComp);

angular.module("voice-signup").directive('testComp',['reactDirective',function(reactDirective){
    return reactDirective(testComp,['name']);
}]);
