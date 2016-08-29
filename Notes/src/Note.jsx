var React = require('react');
// var ReactDom = require('react-dom');

var Note = React.createClass({
    getInitialState: function () {
        return {
            editing: false
        };
    },
    componentDidMount: function () {
        $(ReactDOM.findDOMNode(this)).draggable({scroll: false});
    },
    edit: function () {
        this.setState({editing: true});
    },
    save: function () {
        this.props.onChange(this.refs.newText.value, this.props.index);
        this.setState({editing: false});
    },
    remove: function () {
        this.props.onDelete(this.props.index);
    },
    renderEditableText: function () {
        return (
            <div className="note">
                <textarea ref="newText" defaultValue={this.props.children}></textarea>
                <div className="noteButtons">
                    <button onClick={this.save} className="btn btn-primary glyphicon glyphicon-floppy-disk"/>
                    <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash"/>
                </div>
            </div>
        )
    },
    renderNonEditableText: function () {
        return (
            <div className="note">
                <p className="noteContent">{this.props.children}</p>
                <div className="noteButtons">
                    <button onClick={this.edit} className="btn btn-success glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash"/>
                </div>
            </div>
        )
    },
    render: function () {
        if (this.state.editing) {
            return this.renderEditableText();
        }
        else {
            return this.renderNonEditableText();
        }
    }
});

module.exports = Note;