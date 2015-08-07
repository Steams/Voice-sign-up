//var formInput = require('./formInput_comp');
//var formLabel = require('./formLabel_comp');
var formLabel = React.createClass({

    render: function() {
        return  (
            <div className="formlabel">
                <p>Hl</p>
                <p>field is {this.props.name}</p>
            </div>
        );
    }

});

var formInput = React.createClass({

    getInitialState: function() {
        return {value: ''};
    },

    handleChange: function(event){
        this.setState({value: event.target.value});
    },

    render: function() {
        return (
            <div className="formInput">
                <input type="text" name="input" value={value} onChange={this.handleChange}/>
            </div>
        );
    }
});

var formComp = React.createClass({

    getInitialState: function() {   
        return {value: ''};
    },

    render: function(){
        return (
            <div className="form">
                <formLabel name={this.props.field.name}/>
                <formInput/>
            </div>
        );
    }
});

angular.module("voice-signup").directive('formComp',['reactDirective',function(reactDirective){
    return reactDirective(formComp,['field']);
}]);
