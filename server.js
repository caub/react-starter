// node --use_strict --es_staging --harmony_destructuring --harmony_default_parameters --harmony_rest_parameters

let express = require('express');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
var v = require('./src/vdom.js').bind(React);
var App = require('./src/components/App.js');
let app = express();

// console.log(ReactDOMServer.renderToStaticMarkup(v(App)));
// console.log(ReactDOMServer.renderToString(v(App)));
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/src', express.static('src'));

app.get('/', function(req, res){
	res.send(
		ReactDOMServer.renderToStaticMarkup(
			v('body', 
				v('div', setHtml(ReactDOMServer.renderToString(v(App)))),
	      'ok ..',
	      v('script', {src:'./node_modules/react/dist/react.js'}),
	      v('link', {rel:"stylesheet", type:"text/css", href:"style.css"})
			)
		)
	);
});


var setHtml = html=> ({dangerouslySetInnerHTML: {__html:html}});

app.listen(3000, function () {console.log('server listening on', this.address().port);});