"use strict";

var DisplayContainer = React.createClass({
    displayName: "DisplayContainer",

    updateValue: function updateValue(modifiedValue) {
        this.setState({
            value: modifiedValue
        });
    },
    getInitialState: function getInitialState() {
        return {
            value: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Markdown Previewer](https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js)*'
        };
    },
    rawMarkup: function rawMarkup(value) {
        var rawMarkup = marked(value, { sanitize: true });
        return { __html: rawMarkup };
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "col-md-6" },
                React.createElement(RawInput, { value: this.state.value, updateValue: this.updateValue })
            ),
            React.createElement(
                "div",
                { className: "col-md-6" },
                React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup(this.state.value) })
            )
        );
    }
});

var RawInput = React.createClass({
    displayName: "RawInput",

    update: function update() {
        var modifiedValue = this.refs.inputValue.getDOMNode().value;
        this.props.updateValue(modifiedValue);
    },
    render: function render() {
        return React.createElement("textarea", { rows: "22", type: "text", ref: "inputValue", value: this.props.value, onChange: this.update, className: "form-control" });
    }
});

React.render(React.createElement(DisplayContainer, null), document.getElementById("container"));