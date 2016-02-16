var React = require('react');
var v = require('../vdom.js').bind(React);

module.exports = React.createClass({
	getInitialState(){return {s:false}},
	render(){
		var s = this.state.s;
		return v('div.bar', {
			selected:s, 
			onMouseOver:e=>this.setState({s:true}),
			onMouseOut:e=>this.setState({s:false})
		}, 'bar'+s);
	}
});