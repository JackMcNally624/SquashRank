var express = require('express');
var app = express();

//Specify a port
var port = process.env.port || 8080;

const bodyParser = require('body-parser');
const Datastore = require('nedb');

const database = new Datastore('database.db');
database.loadDatabase();

app.use(bodyParser.urlencoded({extended: false}));

//Serve up files in public folder
app.use('/', express.static(__dirname + '/public'));

//Start up the website
app.listen(port);
console.log('Listening on port: ', port);

app.use(express.json({ limit: '1mb'}));

app.post('/user_create', (request, response) => {
  database.insert(request.body);
  response.end();
});
