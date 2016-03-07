
var createBundle = require('requirify');
var babel = require('babel-core');
var fs = require('fs');


module.exports = function(dir = 'src'){

	let modules = listFilesRec(dir, []).map(m=>'./'+m); // take all modules in dir

	let code = `(function () {
		var require = ${createBundle(modules, {
			entry: './src/index.js',
			map: {
				react: 'React',
				'react-dom': 'ReactDOM'
			}
		})};
	 })()`;

	return babel.transform(code, {presets:['react']}).code;
};

function listFilesRec(dir){
	var items = fs.readdirSync(dir),
			files = [];
	for (var item of items){
		var path = dir+'/'+item;
		if (fs.statSync(path).isDirectory())
			files.push(...listFilesRec(path));
		else
			files.push(path);
	}
	return files;
}