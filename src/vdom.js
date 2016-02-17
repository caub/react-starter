
 // virtual dom helper, it works maybe with document too
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

// var isProps = typeof window !== "undefined" ? // isomorphic util to check if an object is props or children
// 				props => !(props instanceof Node)  : // not a dom node
// 				props => !props.$$typeof; // not a react vdom object


// var v = createElement.bind(React);
// v('div', {id:'foo'}, h('span', 'hello'));



