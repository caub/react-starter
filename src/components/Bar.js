var React = require('react');
var v = require('../vdom.js').bind(React);

module.exports = React.createClass({
	getInitialState(){return {bar:false}},
	render(){
		var bar = this.state.bar;
		// return v('div.bar', {
		// 	selected:bar, 
		// 	onMouseOver:e=>this.setState({bar:true}),
		// 	onMouseOut:e=>this.setState({bar:false})
		// }, 'bar'+bar);

		return <div className={bar?'selected':''} 
			onMouseOver= {e=>this.setState({bar:true})} 
			onMouseOut= {e=>this.setState({bar:false})}>
				{'bar ... '+bar}
		</div>;
	}
});