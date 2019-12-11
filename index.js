var express = require('express');
var app = express();
var path = require('path');
var EloRank = require('elo-rank');
var elo = new EloRank();
const date = require('date-and-time');

//Specify a port
var port = process.env.port || 8080;

const bodyParser = require('body-parser');
const Datastore = require('nedb');

const database = new Datastore('database.db');
const gameLog = new Datastore('gamelog.db');
database.loadDatabase();
gameLog.loadDatabase();

app.use(bodyParser.urlencoded({extended: false}));

//Serve up files in public folder
app.use('/', express.static(__dirname + '/public'));

//Start up the website
app.listen(port);
console.log('Listening on port: ', port);

app.use(express.json({ limit: '1mb'}));

app.post('/user_create', (request, response) => {
  database.insert(request.body);
  response.sendFile(path.join(__dirname + '/public/addplayer.html'));
});

app.post('/game_log', (request, response) => {
  console.log(date.format(new Date(), 'hh:mm A MMM. DD YYYY'));
  console.log(request.body);
  //request.body.time = date.format(new Date(), 'MMM. DD YYYY');
  request.body.time = new Date();
  console.log(request.body);
  gameLog.insert(request.body);
  response.sendFile(path.join(__dirname + '/public/loggame.html'));
});

app.get('/loadplayers', (request, response) => {
  database.find({}, (err, data) => {
    for (item of data) {
      item.elo = 1000;
    }
    gameLog.find({}, (err, games) => {
      for (game of games) {
        var winningNumber = -1;
        var losingNumber = -1;

        for (let i = 0; i < data.length; i++) {
          if (`${game.winner}` == data[i].name) {
            winningNumber = i;
          }
          if (`${game.loser}` == data[i].name) {
            losingNumber = i;
          }
        }
        var expectedScoreWinning = elo.getExpected(data[winningNumber].elo, data[losingNumber].elo);
        var expectedScoreLosing = elo.getExpected(data[losingNumber].elo, data[winningNumber].elo);
        data[winningNumber].elo = elo.updateRating(expectedScoreWinning, 1, data[winningNumber].elo);
        data[losingNumber].elo = elo.updateRating(expectedScoreLosing, 0, data[losingNumber].elo);
      }
      response.json(data);
    });
  });
});

app.get('/loadgames', (request, response) => {
  gameLog.find({}, (err, data) => {
    response.json(data);
  });
});
