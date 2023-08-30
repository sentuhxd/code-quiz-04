// DOM EL


var timerEl = document.querySelector("#timer");
var playnowBtn = document.querySelector("#play-start");
var endplayBtn = document.querySelector("#end-play");
var initalEl = document.querySelector("#initial");
var questionsEl = document.querySelector("#question-sentences");
var choicesEl = document.querySelector("#choices");
var responseEl = document.querySelector("#response");
var nameEl = document.querySelector("#name");





var questions = [
    {
        question: "What kind of language is JavaScript?",
        choices: ["Hypertext Markup Language", "Object-based", "Object-Oriented", "Cascading Style Sheet"],
        answer: "Object-Oriented"
      },
      {
        question: "Which function is used to serialize an object into JSON string in JavaScript?",
        choices: ["parse()", "stringify()", "array()", "parseInt()"],
        answer: "stringify()"
      },
      {
        question: "Which of the following is a JavaScript framework?",
        choices: ["Spark", "Django", "Spring", "React"],
        answer: "React"
      },
      {
        question: "Which of the following is not a method?",
        choices: ["toLowerCase()", ".length", "push()", "sort()"],
        answer: ".length"
      },
] 


// DATA 

var qIndex = 0;
var time = questions.length * 15;
var timerID;


//Functions

function gameStart() {
    timerID = setInterval(timeDown, 1000);
    timerEl.textContent = time;
    var startScreenEl = document.getElementById("container-screen");
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    newQuestion();
}





function newQuestion() {
    var nowQuestion = questions[qIndex];
    var promptEl = document.getElementById("question-sentences");
    promptEl.textContent = nowQuestion.question;
    choicesEl.innerHTML = "";

    nowQuestion.options.forEach(function(choices, i) {
        var choicesBtn = document.createElement("button");
        choicesBtn.setAttribute("value", choices);
        choicesBtn.textContent= i + 1 + ". " + choices;
        choicesBtn.onclick = questionChoice; 
        choicesEl.appendChild(choicesBtn);

    });
}

function questionChoice() {
    if (this.value !== questions[qIndex].answer) {
        time -= 10;
        if (time < 0 ) {
            time = 0;
        }
        timerEl.textContent = time;
        responseEl.textContent = `Wrong! The correct answer was ${questions[qIndex].answer}.`;
    }   else {
        responseEl.textContent = "You're right :D";
    }
    responseEl.setAttribute("class", "response");
    setTimeout(function () {
        responseEl.setAttribute("response", "response hide")
    }, 3000);
    qIndex++;
    if (qIndex === questions.length) {
        gameEnd();
    } else {
        newQuestion();
    }
}

function timeDown() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        gameEnd();
    }
}

function gameEnd() {
    clearInterval(timerID);
    var gameEndEl = document.getElementById("container-end");
    gameEndEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("final-score")
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}



// Initializations 

endplayBtn.addEventListener("click", gameEnd);

document.getElementById("play-start").addEventListener("click", gameStart);
