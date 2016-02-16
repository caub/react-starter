
// mostly for dev, later on we will render this from server
var v = require('./vdom.js').bind(require('react'));
var reactDOM = require('react-dom');
var App = require('./components/App.js');

ReactDOM.render(v(App), document.getElementById('app'));
