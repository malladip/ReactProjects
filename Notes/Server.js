var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.listen(port, ipaddress);

app.use(express.static(__dirname + '/'));

// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();
//
// app.set('port', (process.env.PORT || 3000));
//
// app.use('/', express.static(path.join(__dirname, '.')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
//
// app.listen(app.get('port'), function() {
//     console.log('Server started: http://localhost:' + app.get('port') + '/');
// });