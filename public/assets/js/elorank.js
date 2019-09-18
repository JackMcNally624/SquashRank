

getData();
async function getData() {
  const response = await fetch('/loadplayers');
  const data = await response.json();
  const response2 = await fetch('/loadgames');
  const games = await response2.json();
  var ranknum = 1;

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
    while (j >= 0 && data[j].elo < tmp.elo) {
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
    score.textContent = `${item.elo}`; //Change this to elo when the time comes
    row.append(rank, name, score);
    document.getElementById("tablebody").append(row);
    ranknum++;
  }
}
