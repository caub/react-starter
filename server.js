// run it with 
//node --use_strict --es_staging --harmony_destructuring --harmony_default_parameters --harmony_rest_parameters server
// or npm run server

let express = require('express');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
let createBundle = require('requirify');
let v = require('./src/vdom.js').bind(React);
let App = require('./src/components/App.js');
let buildModules = require('./buildModules.js');
let app = express();


app.use(function(req, res, next) { 
  res.setHeader('Access-Control-Allow-Origin', '*');// just experiments, ignore it
  return next();
});
app.use(express.static('public')); // serves public
app.use('/node_modules', express.static('node_modules')); // node_modules

app.use('/src', express.static('src')); // and src for tests with requirejs mode

// app.get('/dist/bundle.js', function(req, res){ // for tests with bundle mode, recompiled on the fly
// 	let code = buildModules();
// 	console.log('re-bundled at', new Date());
// 	// set header to js? not needed strangely res.setHeader('Content-Type', 'application/javascript');
// 	res.send(code);
// })
//app.use('/dest', express.static('dist')); // or you could also do that and recompile bundle when changing files, with a watcher


app.get('/', function(req, res){
	// set header to html ? works without res.setHeader('Content-Type', 'text/html');
	res.send(
		body(
			{foo: {x:1, y:2}, bar:'ofk'} // some data fetched from DB in general
		)
	);
});

// uncomment either requirejs mode mini-requirejs + require('./src/index.js') or /dest/bundle.js mode below 
// pre-render: <div id="app">${ReactDOMServer.renderToString(v(App, {data:initialData}))}</div>
var body = initialData => `
	<link rel="stylesheet" type="text/css" href="style.css">

	hell world <b>test</b>
	<div id="app"></div>
	<script src="./node_modules/react/dist/react.js"></script>
	<script src="./node_modules/react-dom/dist/react-dom.js"></script>

	<script src="node_modules/mini-requirejs/main.js"></script>
	<script>
	  window.APP_DATA = ${JSON.stringify(initialData)};
		require('./src/index.js');
	</script>
	<!-- <script src="/dist/bundle.js"></script> -->
`;

// could use React.renderToStaticMarkup

app.listen(3000, function(){console.log('server listening on', this.address().port)});