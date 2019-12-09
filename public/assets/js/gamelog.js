

getGameLog();
async function getGameLog() {
  const response2 = await fetch('/loadgames');
  const games = await response2.json();

  for (let i = 1; i < games.length; i++) {
    let j = i - 1;
    let tmp = games[i];
    while (j >= 0 && games[j].time > tmp.time) {
      games[j + 1] = games[j];
      j--;
    }
    games[j+1] = tmp;
  }

  for (item of games) {
    const row = document.createElement('tr');
    const winner = document.createElement('td');
    const loser = document.createElement('td');
    const time = document.createElement('td');
    winner.textContent = `${item.winner}`;
    loser.textContent = `${item.loser}`;
    time.textContent = `${item.time}`;
    row.append(winner, loser, time);
    document.getElementById("tablebody").append(row);
  }
}
