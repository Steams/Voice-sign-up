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

module.exports = formInput;
