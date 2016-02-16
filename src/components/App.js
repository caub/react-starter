var React = require('react');
var v = require('../vdom.js');
var Foo = require('./Foo.js');
var Bar = require('./Bar.js');

module.exports = React.createClass({
	render(){
		return v('div.app', 
			'hello world', 
			v('div', 
				v(Foo),
				v('pre', v(Bar))
			)
		);
	}
});