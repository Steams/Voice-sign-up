//var formInput = require('./formInput_comp');
//var formLabel = require('./formLabel_comp');
var formLabel = React.createClass({displayName: "formLabel",

    render: function() {
        return  (
            React.createElement("div", {className: "formlabel"}, 
                React.createElement("p", null, "Hl"), 
                React.createElement("p", null, "field is ", this.props.name)
            )
        );
    }

});

var formInput = React.createClass({displayName: "formInput",

    getInitialState: function() {
        return {value: ''};
    },

    handleChange: function(event){
        this.setState({value: event.target.value});
    },

    render: function() {
        return (
            React.createElement("div", {className: "formInput"}, 
                React.createElement("input", {type: "text", name: "input", value: value, onChange: this.handleChange})
            )
        );
    }
});

var formComp = React.createClass({displayName: "formComp",

    getInitialState: function() {   
        return {value: ''};
    },

    render: function(){
        return (
            React.createElement("div", {className: "form"}, 
                React.createElement("formLabel", {name: this.props.field.name}), 
                React.createElement("formInput", null)
            )
        );
    }
});

angular.module("voice-signup").directive('formComp',['reactDirective',function(reactDirective){
    return reactDirective(formComp,['field']);
}]);
