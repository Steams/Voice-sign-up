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

module.exports = formLabel;
