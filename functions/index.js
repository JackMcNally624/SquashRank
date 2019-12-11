const express = require('express');
const app = express();
var path = require('path');
var EloRank = require('elo-rank');
var elo = new EloRank(35);
const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const database = new Datastore('database.db');
const gameLog = new Datastore('gamelog.db');
database.loadDatabase();
gameLog.loadDatabase();

const admin = require('firebase-admin');


// admin.initializeApp(functions.config().firebase);


// We somehow need to combine this ^^^ with this vvv

/*
admin.initializeApp({
    credential: admin.credential.cert(require('../keys/admin.json')),
    firebase: functions.config()
});
*/

/*
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(require('../keys/admin.json'));
admin.initializeApp(adminConfig, functions.config().firebase);
*/

/*
admin.initializeApp({
    credential: admin.credential.cert(require('../keys/admin.json')),
    firebase: functions.config().firebase
});
*/


admin.initializeApp({
    credential: admin.credential.cert(require('../keys/admin.json'))
});



/*
NOTES
 -> admin.initializeApp(functions.config().firebase);
    -> deploy
        -> dropdown shows all names
        -> can add new names
        -> no names on the leaderboard
    -> serve
        -> drop down does not show names
        -> no names on the leaderboard
        -> could not load defult credentials
 -> admin.initializeApp({
    -> deploy
        -> Error setting up the execution environment for your function
        -> Functions deploy had errors with the following functions: app
        -> Error: Functions did not deploy properly
    -> serve
        -> names on the leaderboard
        -> dropdown shows all names
*/

let db = admin.firestore();

let docRef = db.collection('users').doc('Jack McNally');

let setAda = docRef.set({
  name: 'Jack McNally'
});

app.use(bodyParser.urlencoded({extended: false}));


app.get('/timestamp', (request, response) => {
  response.send(`${Date.now()}`);
})

app.get('/timestamp-cached', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  response.send(`${Date.now()}`);
})

app.post('/user_create', (request, response) => {
  console.log(request.body);
  console.log(request.body._id);
  console.log(JSON.stringify(request.body));
  console.log(JSON.stringify(request.body.name));

  let docRef = db.collection('users').doc(JSON.stringify(request.body.name));
  let setAda = docRef.set({
    name: JSON.stringify(request.body.name)
  });
  response.redirect('https://squashrank-c21f3.web.app/addplayer.html');
});

app.post('/game_log', (request, response) => {
  let docRef = db.collection('game').doc(JSON.stringify(request.body.winner));
  let setAda = docRef.set({
    winner: JSON.stringify(request.body.winner),
    loser: JSON.stringify(request.body.loser)
  });
  response.redirect('https://squashrank-c21f3.web.app/loggame.html');
});

app.get('/loadplayers', (request, response) => {
  let userRef = db.collection('users');
  let players = [];
  let allUsers = userRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      console.log("GOOD");
      players.push(doc.data());
      console.log(players);
    });
    console.log("MAYBE");
    console.log(players);
    console.log("MAYBE");
    response.json(players);
  })
  .catch(err => {
    console.log("NOT GOOD");
    console.log('Error getting documents', err);
    console.log("NOT GOOD");
  });

  console.log("FUCK");
  console.log(players);
  console.log("FUCK");

  /*
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
  */
});

app.get('/loadgames', (request, response) => {
  gameLog.find({}, (err, data) => {
    response.json(data);
  });
});

exports.app = functions.https.onRequest(app);
