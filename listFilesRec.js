var fs = require('fs');

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

module.exports = listFilesRec;