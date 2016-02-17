
// mostly for dev, later on we will render this from server
var React = require('react');
var v = require('./vdom.js').bind(React);
var reactDOM = require('react-dom');
var App = require('./components/App.js');

ReactDOM.render(v(App), document.getElementById('app'));
