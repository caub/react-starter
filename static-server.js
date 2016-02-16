"use strict";

let express = require('express');

// serve everything in the project, for dev, using requirejs in index.html

let app = express();
app.use(express.static('.'));
app.listen(3001, function () {console.log('server listening on', this.address().port);});