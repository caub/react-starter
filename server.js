// run it with 
//node --use_strict --es_staging --harmony_destructuring --harmony_default_parameters --harmony_rest_parameters server
// or npm run server

let express = require('express');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
var createBundle = require('requirify');
var v = require('./src/vdom.js').bind(React);
var App = require('./src/components/App.js');
var listFilesRec = require('./listFilesRec');
let app = express();


app.use(function(req, res, next) { 
  res.setHeader('Access-Control-Allow-Origin', '*');// just experiments, ignore it
  return next();
});
app.use(express.static('public')); // serves public
app.use('/node_modules', express.static('node_modules')); // node_modules

app.use('/src', express.static('src')); // and src for tests with requirejs mode

app.get('/dest/bundle.js', function(req, res){ // for tests with bundle mode, recompiled on the fly
	var modules = listFilesRec('src', []).map(m=>'./'+m); // take all modules in src
	var code = `(function () {
	  var require = ${createBundle(modules, {
	        entry: './src/index.js',
	        map: {
						react: 'React',
						'react-dom': 'ReactDOM'
					}
	    })};
	 })()`;
	 console.log('bundled', new Date());
	 // set header to js? not needed starngely res.setHeader('Content-Type', 'application/javascript');
	 res.send(code);
})

//app.use('/dest', express.static('dest')); // you could also do that and recompile bundle when changing files, with a watcher


app.get('/', function(req, res){
	// set header to html ? works without res.setHeader('Content-Type', 'text/html');
	res.send(
		body(
			ReactDOMServer.renderToString(v(App)),
			{foo: {x:1, y:2}, bar:'ok'}
		)
	);
});

// uncomment either requirejs mode mini-requirejs + require('./src/index.js') or bundle mode below
var body = (renderedByServer='', initialData={}) => `<body> hell world <b>test</b>
<div id="app">${renderedByServer}</div>
<script src="./node_modules/react/dist/react.js"></script>
<script src="./node_modules/react-dom/dist/react-dom.js"></script>

<script src="node_modules/mini-requirejs/main.js"></script>
<script>
  window.__data__ = ${JSON.stringify(initialData)};
	require('./src/index.js');
</script>
<!-- <script src="/dest/bundle.js"></script> -->
<link rel="stylesheet" type="text/css" href="style.css">
</body>`;


app.listen(3000, function () {console.log('server listening on', this.address().port);});