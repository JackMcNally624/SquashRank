// boilerplate navbar stuff
const div = document.createElement('div');
div.className = "sidebar-collapse";
const ul = document.createElement('ul');
ul.className = "nav";
ul.id = "main-menu";

// leaderboard
const li1 = document.createElement('li');
li1.className = "active-link";
const a1 = document.createElement('a');
const i1 = document.createElement('i');
a1.href = "index.html";
a1.textContent = "📋 Leader Board";
a1.append(i1);
li1.append(a1);



// log game
const li2 = document.createElement('li');
const a2 = document.createElement('a');
const i2 = document.createElement('i');
a2.href = "loggame.html";
a2.textContent = "➕ Log a Game";
a2.append(i2);
li2.append(a2);

// add player
const li3 = document.createElement('li');
const a3 = document.createElement('a');
const i3 = document.createElement('i');
a3.href = "addplayer.html";
a3.textContent = "➕ Add a Player";
a3.append(i3);
li3.append(a3);

// add player
const li4 = document.createElement('li');
const a4 = document.createElement('a');
const i4 = document.createElement('i');
a4.href = "gamelog.html";
a4.textContent = "➕ Game Log";
a4.append(i4);
li4.append(a4);

// add all the tabs into the navbar
ul.append(li1, li2, li3, li4);
div.append(ul);
document.getElementById("navbar").append(div);
