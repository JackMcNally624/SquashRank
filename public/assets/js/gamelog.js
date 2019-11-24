

getGameLog();
async function getGameLog() {
  const response2 = await fetch('/loadgames');
  const games = await response2.json();

  for (item of games) {
    const row = document.createElement('tr');
    const winner = document.createElement('td');
    const loser = document.createElement('td');
    winner.textContent = `${item.winner}`;
    loser.textContent = `${item.loser}`;
    row.append(winner, loser);
    document.getElementById("tablebody").append(row);
  }
}
