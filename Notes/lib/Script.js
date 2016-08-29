/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Board = __webpack_require__(2);

	ReactDOM.render(React.createElement(Board, { maxNotes: 50 }), document.getElementById('react-container'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Note = __webpack_require__(3);

	var Board = React.createClass({
	    displayName: 'Board',

	    propTypes: {
	        maxNotes: function maxNotes(props, propName) {
	            if (typeof props[propName] !== 'number') {
	                return new Error("The property should be a Number");
	            }
	            if (props[propName] > 100) {
	                return new Error("Max number of Notes reached. Please delete before adding");
	            }
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            notes: []
	        };
	    },
	    getNextID: function getNextID() {
	        this.nextID = this.nextID || 0;
	        return this.nextID++;
	    },
	    update: function update(newText, index) {
	        var newNotes = this.state.notes;
	        newNotes[index].text = newText;
	        this.setState({ notes: newNotes });
	    },
	    remove: function remove(index) {
	        var newNotes = this.state.notes;
	        newNotes.splice(index, 1);
	        this.setState({ notes: newNotes });
	    },
	    newNote: function newNote() {
	        var newNotes = this.state.notes;
	        newNotes.push({
	            id: this.getNextID(),
	            text: "New Note"
	        });
	        this.setState({ notes: newNotes });
	    },
	    clearNotes: function clearNotes() {
	        this.setState({ notes: [] });
	    },
	    displayNotes: function displayNotes(note, index) {
	        return React.createElement(
	            Note,
	            { key: note.id,
	                index: index,
	                onChange: this.update,
	                onDelete: this.remove },
	            note.text
	        );
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'board' },
	            React.createElement(
	                'div',
	                { className: 'boardContent' },
	                this.state.notes.map(this.displayNotes)
	            ),
	            React.createElement(
	                'div',
	                { className: 'boardButtons' },
	                React.createElement('button', { onClick: this.newNote, className: 'center btn btn-success glyphicon glyphicon-plus' }),
	                React.createElement('button', { onClick: this.clearNotes, className: 'center btn btn-danger glyphicon glyphicon-erase' })
	            )
	        );
	    }
	});

	module.exports = Board;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	// var ReactDom = require('react-dom');

	var Note = React.createClass({
	    displayName: "Note",

	    getInitialState: function getInitialState() {
	        return {
	            editing: false
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        $(ReactDOM.findDOMNode(this)).draggable({ scroll: false });
	    },
	    edit: function edit() {
	        this.setState({ editing: true });
	    },
	    save: function save() {
	        this.props.onChange(this.refs.newText.value, this.props.index);
	        this.setState({ editing: false });
	    },
	    remove: function remove() {
	        this.props.onDelete(this.props.index);
	    },
	    renderEditableText: function renderEditableText() {
	        return React.createElement(
	            "div",
	            { className: "note" },
	            React.createElement("textarea", { ref: "newText", defaultValue: this.props.children }),
	            React.createElement(
	                "div",
	                { className: "noteButtons" },
	                React.createElement("button", { onClick: this.save, className: "btn btn-primary glyphicon glyphicon-floppy-disk" }),
	                React.createElement("button", { onClick: this.remove, className: "btn btn-danger glyphicon glyphicon-trash" })
	            )
	        );
	    },
	    renderNonEditableText: function renderNonEditableText() {
	        return React.createElement(
	            "div",
	            { className: "note" },
	            React.createElement(
	                "p",
	                { className: "noteContent" },
	                this.props.children
	            ),
	            React.createElement(
	                "div",
	                { className: "noteButtons" },
	                React.createElement("button", { onClick: this.edit, className: "btn btn-success glyphicon glyphicon-pencil" }),
	                React.createElement("button", { onClick: this.remove, className: "btn btn-danger glyphicon glyphicon-trash" })
	            )
	        );
	    },
	    render: function render() {
	        if (this.state.editing) {
	            return this.renderEditableText();
	        } else {
	            return this.renderNonEditableText();
	        }
	    }
	});

	module.exports = Note;

/***/ }
/******/ ]);