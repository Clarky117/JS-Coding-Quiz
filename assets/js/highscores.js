// pull score from users local storage otherwise initialise an empty array, sort scores from high to low
function printHighscores() {
   let highScores = JSON.parse(localStorage.getItem("highscores"));
   if (highScores != null) {
   highScores.sort(function(min, max) {
   return parseInt(max.score) - parseInt(min.score);
});

// create list tags for each score and style every second row in css for easier reading and display on page
   for (let i = 0; i < highScores.length; i++){
      let scoreLi = document.createElement("li");
      scoreLi.textContent = highScores[i].initials + " - " + highScores[i].score;
      document.getElementById("highscores").appendChild(scoreLi);
   }} else {
      let temp = document.getElementById("highscores");
      temp.textContent = "How about you play the quiz?";     
   };
};
   
// clear high scores and refresh current page
function clearHighscores() {
   localStorage.removeItem("highscores");
   location.reload();
};
   
// attach clear event to clear score button
   let clearButton = document.getElementById("clear");
   clearButton.addEventListener("click", function(){
   clearHighscores();
});

// last but not least, show ya scores
printHighscores();
