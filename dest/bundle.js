(function () {
  var require = /*! bundle compiled on Wed Feb 17 2016 23:54:54 GMT+0100 (Paris, Madrid) */
(function () {
	var require = window.require = (function () {
		var ROOT = '/';
		var REQUIRE_CACHE = Object.create(null);
		var REQUIRE_SOURCE = Object.create(null);
		var REQUIRE_MAP = Object.create(null);
		var RE_URL = /^\w+:\/\/.+/;
		
		function require(url) {
			if (!url.startsWith('.')&&!url.startsWith('/')) return window[REQUIRE_MAP[url]];
			var abs = _GenerateFQN_(url, this.__dirname);
						var dir = abs.split(ROOT).slice(0, -1).join(ROOT) + ROOT;
			if (abs in REQUIRE_CACHE) {
				return REQUIRE_CACHE[abs].exports;
			}
			var MODULE_CODE = REQUIRE_SOURCE[abs];
			var MODULE_EXECUTABLE = REQUIRE_SOURCE[abs];
			var MODULE__module = {
				__dirname: dir,
				exports: {}
			};
			REQUIRE_CACHE[abs] = MODULE__module;
			MODULE_EXECUTABLE.call(MODULE__module.exports, MODULE__module, MODULE__module.exports, dir, 
require.bind(MODULE__module));
			return MODULE__module.exports;
		}
		function _GenerateFQN_(url, __dirname) {
			if (url.match(RE_URL)) {
					return url;
			} else if (url.startsWith(ROOT)) {
					return jn(url);
			} else { //if (url.startsWith('./') || url.startsWith('../')) {
				return jn(__dirname, url);
			}// else return _GenerateFQN_(REQUIRE_MAP[url], ROOT);
		}
		function jn() {
			return '.' + new URL([].join.call(arguments, ROOT).replace(/\/+/g, ROOT), 'http://a.b/').pathname;
		}
		var globalRequire = require.bind({__dirname: ROOT});
		globalRequire.register = function (module, compiled) {
			REQUIRE_SOURCE[module] = compiled;
		};
		globalRequire.map = function (a, b) {
			console.log('map',a, b);
			REQUIRE_MAP[a] = b;
		};
		return globalRequire;
	})();
	require.register("./src/components/App.js", function (module, exports, __dirname, require) {
		var React = require('react');
var v = require('../vdom.js').bind(React);
var Foo = require('./Foo.js');
var Bar = require('./Bar.js');

module.exports = React.createClass({
	getInitialState(){ return {data: this.props.data} }, // some state pre-computed on server usually
	getDefaultProps(){ return {data:{foo:{}}}},
	render(){
		var data = this.state.data; // let's say it's for storing click position
		return v('div.app', {
			onClick:e=>this.setState({data:Object.assign({},data,{foo:{x:e.clientX,y:e.clientY}})})
			},
			'hello world ', `you clicked there: ${data.foo.x}, ${data.foo.y}`,
			v('div', 
				v(Foo),
				v('pre', v(Bar))
			)
		);
	}
});
	});
	require.register("./src/components/Bar.js", function (module, exports, __dirname, require) {
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
	});
	require.register("./src/components/Foo.js", function (module, exports, __dirname, require) {
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
	});
	require.register("./src/components/things/Widget.js", function (module, exports, __dirname, require) {
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
	});
	require.register("./src/index.js", function (module, exports, __dirname, require) {
		
// mostly for dev, later on we will render this from server
var React = require('react');
var v = require('./vdom.js').bind(React);
var reactDOM = require('react-dom');
var App = require('./components/App.js');

ReactDOM.render(v(App, {data:window.APP_DATA}), document.getElementById('app'));

	});
	require.register("./src/vdom.js", function (module, exports, __dirname, require) {
		
 // virtual dom helper, it could work probably with other objects than React that implements createElement(tag, props, ...children)
function createElement(selector='', props, ...a){ 
	if (typeof selector ==='function') return this.createElement(selector, props, ...a);
	var [tag, ...cls] = selector.split('.');
	if (typeof props==='object' && !props.$$typeof) { 
		// special properties for dynamic classes are active and selected
		if (props.active) cls.push('active');
		if (props.selected) cls.push('selected');
		if (cls.length) props.className = cls.join(' '); // className isn't used directly through props, always through tags selector and active/selected conditionnal classes
		return this.createElement(tag||'div', props, ...a);
	}
	return this.createElement(tag||'div', {className:cls.length?cls.join(' '):null}, props, ...a);// props is a child
};

module.exports = createElement;

// var v = createElement.bind(React);
// v('div', {id:'foo'}, h('span', 'hello'));




	});
		require.map('react', 'React');
require.map('react-dom', 'ReactDOM');
	require('./src/index.js');

})();
;
 })()