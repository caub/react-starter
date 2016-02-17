
var fs = require('fs');
var createBundle = require('requirify');
var listFilesRec = require('./listFilesRec');
// var babel = require("babel-core"); // 
//if (process.argv.length<5) throw new Error('node build [entry file] [files dir] [dest file] [runBabel]');

// process.argv.push('src', 'src/index.js', 'dest/bundle.js');
// node build src src/index.js dest/bundle.js


var dir = process.argv[2] || 'src';
var entry = './' +(process.argv[3] ||'src/index.js');
var dest = './' +(process.argv[4] || 'dest/bundle.js');
// var babel = process.argv[5];

var modules = listFilesRec(dir, []).map(m=>'./'+m); // take all modules in dir
var code = `(function () {
  var require = ${createBundle(modules, {
        entry: entry,
        map: {},
    })};
 })()`;

//if (babel) code = babel.transform(code, {presets:['es2015']}).code;

fs.writeFile(dest, createBundle(dir, entry), function() {
    console.log('Build finished');
});
