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

module.exports = formInput;
