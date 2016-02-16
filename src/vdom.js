
 // virtual dom helper, it works maybe with document too
module.exports = function(selector='', props, ...a){ 
	if (typeof selector ==='function') return this.createElement(selector, props, ...a);
	let [tag, ...cls] = selector.split('.');
	if (props && typeof props==='object' && !props.$$typeof) { 
		// special properties for dynamic classes are active and selected
		if (props.active) cls.push('active');
		if (props.selected) cls.push('selected');
		if (cls.length) props.className = cls.join(' '); // className isn't used directly through props, always through tags selector and active/selected conditionnal classes
		return this.createElement(tag||'div', props, ...a);
	}
	return this.createElement(tag||'div', {className:cls.length?cls.join(' '):null}, props, ...a);// props is a child
};
