// logic here

// question variables
let currentQuestionIndex = 0;
let time = questions.length * 10;

// variables from the DOM
let questionsEl = document.getElementById("questions");
let timerEl = document.getElementById("time");
let choicesEl = document.getElementById("choices");
let submitBtn = document.getElementById("submit");
let startBtn = document.getElementById("start");
let initialsEl = document.getElementById("initials");
let feedbackEl = document.getElementById("feedback");


// function to start the quiz and hide initial screen
function startQuiz() {
   let startScreen = document.getElementById("start-screen");
   startScreen.setAttribute("class", "start hide");
   // show questions and start timer
   questionsEl.setAttribute("class", " ");
   timerId = setInterval(function(){
   clockTick();
 }, 1000);
   timerEl.textContent = time;
   getQuestion();
}


// function to pull questions from questions.js
function getQuestion() {
   // get current question object from array
   let currentQuestion = questions[currentQuestionIndex];
   // update question
   questionsEl.children[0].textContent = currentQuestion.title;
   // clear out any old question choices
   while (choicesEl.hasChildNodes()) {
   choicesEl.removeChild(choicesEl.lastChild);
}

   // loop over choices
for(let ii = 0; ii < currentQuestion.choices.length; ii++){
   // create new button for each choice
   let choiceButton = document.createElement("button");
   choiceButton.textContent = currentQuestion.choices[ii];
    
   // display on the page
   choicesEl.appendChild(choiceButton);
}
// add event listener to each new choice
choicesEl.children[0].addEventListener("click", function(event){
   questionClick(choicesEl.children[0]);
});
choicesEl.children[1].addEventListener("click", function(event){
   questionClick(choicesEl.children[1]);
});
choicesEl.children[2].addEventListener("click", function(event){
   questionClick(choicesEl.children[2]);
});
choicesEl.children[3].addEventListener("click", function(event){
   questionClick(choicesEl.children[3]);
});
}


// check user answer and deduct time if incorrect and display new time if incorrect
function questionClick(answerChoice) {   
   if(answerChoice.textContent != questions[currentQuestionIndex].answer){
    time -= 10;
   feedbackEl.textContent = "Incorrect";
} else{
   feedbackEl.textContent = "Correct";
}

 // let the user know if their answer was correct
 feedbackEl.setAttribute("class", "feedback");
 setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
 }, 1000);

 // next question please
 currentQuestionIndex++;

// if no more questions then end quiz
if(currentQuestionIndex === questions.length)
   quizEnd();
else
   getQuestion();
}


function quizEnd() {
   // stop timer
   clearInterval(timerId);
   timerEl.textContent = time;

   // show user the end screen
   let endScreenEl = document.getElementById("end-screen");
   endScreenEl.setAttribute("class", " ");

   // show user their final score
   let finalScoreEl = document.getElementById("final-score");
   finalScoreEl.textContent = time;

   // hide questions section
   questionsEl.setAttribute("class", "hide");
}


// show user relevant time and end quiz if no time available
function clockTick() {
   time--;
   timerEl.textContent = time;
if(time <= 0)
   quizEnd();  
}

// save high score with initial and validate user entry
function saveHighscore() {
   let initials = initialsEl.value.toUpperCase();
if(initials === ""){ 
   alert("Please enter your initials :)");
   return;
} else if(initials.length > 4){
   alert("Surely you don't have more than 4 names :)");
   return;
} else {
   
// pull saved scores from local storage, if user hasn't played quiz or cleared scores will return an empty array
   let highscores;
   if(JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
   else
      highscores = [];
   // format new score object for current user
   let newScore = {
     initials: initials,
     score: time
   };
   highscores.push(newScore);
   // save to localstorage
   localStorage.setItem("highscores", JSON.stringify(highscores));
   // redirect to next page
   location.href = "highscores.html";
}
}


// if the user smashes enter, this is the work around
function checkForEnter(event) {
   if(event.keyCode === 13)
   saveHighscore();
}


submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;
