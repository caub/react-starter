var React = require('react');
var v = require('../../vdom.js').bind(React);

module.exports = React.createClass({
	getInitialState(){return {clicks:0}},
	componentDidMount(){
		document.addEventListener('click', this.clickInc);
	},
	componentWillunmount(){
		console.log('unmounting widg');
		document.removeEventListener('click', this.clickInc);
	},

	clickInc(){
		this.setState({clicks: this.state.clicks+1})
	},
	
	render(){
		var s = this.state.s;
		return v('div.widget', 'clicks'+this.state.clicks);
	}
});