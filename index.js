var express = require('express');
var app = express();
var path = require('path');
var EloRank = require('elo-rank');
var elo = new EloRank();

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
  gameLog.insert(request.body);
  response.sendFile(path.join(__dirname + '/public/loggame.html'));
});

app.get('/loadplayers', (request, response) => {
  database.find({}, (err, data) => {
    for (item of data) {
      item.elo = 1000;
    }
    gameLog.find({}, (err, games) => {
      console.log(data);
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
      console.log(data);
      response.json(data);
    });
  });
});

app.get('/loadgames', (request, response) => {
  gameLog.find({}, (err, data) => {
    response.json(data);
  });
});

/*

//create object with K-Factor(without it defaults to 32)
var EloRank = require('elo-rank');
var elo = new EloRank();

var playerA = 1200;
var playerB = 1400;

//Gets expected score for first parameter
var expectedScoreA = elo.getExpected(playerA, playerB);
var expectedScoreB = elo.getExpected(playerB, playerA);

//update score, 1 if won 0 if lost
playerA = elo.updateRating(expectedScoreA, 1, playerA);
playerB = elo.updateRating(expectedScoreB, 0, playerB);

for (item of data) {
  item.elo = 1000;
}

for (game of games) {
  var winningNumber = -1;
  var losingNumber = -1;

  for (let i = 0; i < data.length; i++) {
    if (`${game.winner}` == data[i].name) {
      winningNumber = i;
    }
    if (`${game.losing}` == data[i].name) {
      losingNumber = i;
    }
  }

  var expectedScoreWinning = elo.getExpected(item[winningNumber].elo, item[losingNumber].elo);
  var expectedScoreLosing = elo.getExpected(item[losingNumber].elo, item[winningNumber].elo);
  item[winningNumber].elo = updateRating(expectedScoreWinning, 1, item[winningNumber]);
  item[losingNumber].elo = updateRating(expectedScoreLosing, 0, item[losingNumber]);
}

*/
