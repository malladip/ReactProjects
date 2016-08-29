var React = require('react');
var Note = require('./Note');

var Board = React.createClass({
    propTypes: {
        maxNotes: function (props, propName) {
            if (typeof props[propName] !== 'number') {
                return new Error("The property should be a Number");
            }
            if (props[propName] > 100) {
                return new Error("Max number of Notes reached. Please delete before adding");
            }
        }
    },
    getInitialState: function () {
        return {
            notes: []
        };
    },
    getNextID: function () {
        this.nextID = this.nextID || 0;
        return this.nextID++;
    },
    update: function (newText, index) {
        var newNotes = this.state.notes;
        newNotes[index].text = newText;
        this.setState({notes: newNotes});
    },
    remove: function (index) {
        var newNotes = this.state.notes;
        newNotes.splice(index, 1);
        this.setState({notes: newNotes});
    },
    newNote: function () {
        var newNotes = this.state.notes;
        newNotes.push({
            id: this.getNextID(),
            text: "New Note"
        });
        this.setState({notes: newNotes});
    },
    clearNotes: function () {
        this.setState({notes: []});
    },
    displayNotes: function (note, index) {
        return (
            <Note key={note.id}
                  index={index}
                  onChange={this.update}
                  onDelete={this.remove}>
                {note.text}
            </Note>
        );
    },
    render: function () {
        return (
            <div className="board">
                <div className="boardContent">
                    {this.state.notes.map(this.displayNotes)}
                </div>
                <div className="boardButtons">
                    <button onClick={this.newNote} className="center btn btn-success glyphicon glyphicon-plus"/>
                    <button onClick={this.clearNotes} className="center btn btn-danger glyphicon glyphicon-erase"/>
                </div>
            </div>
        );
    }
});

module.exports = Board;