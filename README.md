# SquashRank
This web application ranks a group of Squash players using the Elo Rating System.

How I deploy this application:
Step 1) Git add, commit, and push on NYC machine
Step 2) Git pull on my laptop
Step 3) Make any changes locally on my laptop
Step 4) Git add, commit, and push those changes
Step 5) SSH into the NYC machine
Step 6) Run "forever stopall"
Step 7) Run "git pull"
Step 8) Run "forever start index.js"
Step 9) Go to http://159.65.41.113/
