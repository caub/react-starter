"use strict";

var fs = require('fs');
var createBundle = require('requirify');
// var babel = require("babel-core"); // 

// process.argv.push('src', 'src/index.js', 'dest/bundle.js');
// node build src src/index.js dest/bundle.js

//if (process.argv.length<5) throw new Error('node build [entry file] [files dir] [dest file] [runBabel]');

var entry = './' +(process.argv[2] ||'src/index.js');
var dir = process.argv[3] || 'src';
var dest = './' +(process.argv[4] || 'dest/bundle.js');

var modules = listFilesRec(dir, []).map(m=>'./'+m); // take all modules in dir
//console.log(modules);

var code = `(function () {
    var require = ${createBundle(modules, {
        entry: entry,
        map: {},
    })};
; })()`;

// if (process.argv[5]) code = babel.transform(code, {presets:['es2015']}).code;

fs.writeFile(dest, code, function() {
    console.log('Build finished');
});

function listFilesRec(dir, files){
	let items = fs.readdirSync(dir);
	for (let item of items){
		let path = dir+'/'+item;
		if (fs.statSync(path).isDirectory())
			files.push(...listFilesRec(path, []));
		else
			files.push(path);
	}
	return files;
}