var React = require('react');
var v = require('../vdom.js').bind(React);
var Widget = require('./things/Widget.js');

module.exports = React.createClass({
	getInitialState(){return {x:0}},
	render(){
		var x = this.state.x;
		return v('div.foo', 
			'foo'+x, 
			v('button', {onClick:e=>this.setState({x:x+1})}, '+'),
			v(Widget)
		);
	}
});