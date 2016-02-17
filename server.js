// node --use_strict --es_staging --harmony_destructuring --harmony_default_parameters --harmony_rest_parameters

let express = require('express');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
// var createBundle = require('requirify');
var v = require('./src/vdom.js').bind(React);
var App = require('./src/components/App.js');
// var listFilesRec = require('./listFilesRec');
let app = express();

// console.log(ReactDOMServer.renderToStaticMarkup(v(App)));
// console.log(ReactDOMServer.renderToString(v(App)));
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/src', express.static('src'));

// var modules = listFilesRec('src', []).map(m=>'./'+m); // take all modules in dir

app.get('/', function(req, res){
	res.send(
		ReactDOMServer.renderToStaticMarkup(
			v('body', 
				v('div', {id:'app', dangerouslySetInnerHTML: {__html:ReactDOMServer.renderToString(v(App))}} ),
	      'ok ..',
	      v('script', {src:'./node_modules/react/dist/react.js'}),
	      v('script', {src:'./node_modules/react-dom/dist/react-dom.js'}),
	      v('link', {rel:"stylesheet", type:"text/css", href:"style.css"})
			)
		)
	);
});


var body = `<body>
<div id="app"></div>


<script src="./node_modules/react/dist/react.js"></script>
<script src="./node_modules/react-dom/dist/react-dom.js"></script>

<!-- uncomment 1, 2 or 3 -->

<!-- 1.  awal's requirejs -->
<script src="node_modules/mini-requirejs/main.js"></script>
<!-- <script src = "./src/index.js"></script> -->

<script>
	require('./src/index.js');
</script>

<!-- 2. awal's bundle -->

<!-- <script src="dest/bundle.js"></script> -->

<!-- 3. browserify bundle -->

<!-- <script src="dest/bundle2.js"></script> -->


<link rel="stylesheet" type="text/css" href="style.css">

</body>`;


var setHtml = html=> ({dangerouslySetInnerHTML: {__html:html}});

app.listen(3000, function () {console.log('server listening on', this.address().port);});