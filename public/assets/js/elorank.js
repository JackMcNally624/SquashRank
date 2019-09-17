

getData();
async function getData() {
  const response = await fetch('/loadplayers');
  const data = await response.json();
  const response2 = await fetch('/loadgames');
  const games = await response2.json();
  var ranknum = 1;

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



  for (item of data) {
    var wins = 0;
    for (game of games) {
      if (`${game.winner}` == `${item.name}`) {
        wins++;
      }
    }
    item.wins = wins;
  }

  for (let i = 1; i < data.length; i++) {
    let j = i - 1;
    let tmp = data[i];
    while (j >= 0 && data[j].wins < tmp.wins) {
      data[j + 1] = data[j];
      j--;
    }
    data[j+1] = tmp;
  }

  for (item of data) {
    const row = document.createElement('tr');
    const rank = document.createElement('td');
    const name = document.createElement('td');
    const score = document.createElement('td');
    rank.textContent = ranknum.toString();
    name.textContent = `${item.name}`;
    score.textContent = `${item.elo}`;
    row.append(rank, name, score);
    document.getElementById("tablebody").append(row);
    ranknum++;
  }
}
