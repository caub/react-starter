var React = require('react');
var v = require('../vdom.js').bind(React);
var Foo = require('./Foo.js');
var Bar = require('./Bar.js');

module.exports = React.createClass({
	getInitialState(){ return {data: this.props.data} }, // some state pre-computed on server usually
	getDefaultProps(){ return {data: typeof window!=='undefined' && window.APP_DATA || {foo:{}}}},
	render(){
		var data = this.state.data; // let's say it's for storing click position
		return v('div.app', {
			onClick:e=>this.setState({data:Object.assign({},data,{foo:{x:e.clientX,y:e.clientY}})})
			},
			'hello world ', `you clicked there: ${data.foo.x}, ${data.foo.y}`,
			v('div', 'some random comps for demo',
				v(Foo),
				v('pre', v(Bar))
			)
		);
	}
});