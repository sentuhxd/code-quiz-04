// DOM EL


var timerEl = document.querySelector("#timer");
var playnowBtn = document.querySelector("#play-start");
var endplayBtn = document.querySelector("#end-play");
var initalEl = document.querySelector("#initial");
var questionsEl = document.querySelector("#question-sentences");
var infoEl= document.querySelector("#info")
var responseEl = document.querySelector("#response")





var questions = [  
    {
      question: "What kind of language is JavaScript?",
      options: ["Hypertext Markup Language", "Java", "Object-Oriented", "Cascading Style Sheets"],
      correct: "Object-Oriented"
    },
    {
      question: "Which function is used to serialize an object into JSON string in JavaScript?",
      options: ["parse()", "stringify()", "array()", "parseInt()"],
      correct: "stringify()"
    },
    {
      question: "How do you call a function named myFunction?",
      options: ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction"],
      correct: "myFunction()"
    },
    {
      question: "Which of the following is not a method?",
      options: ["toLowerCase()", ".length", "push()", "sort()"],
      correct: ".length"
    },
]

// DATA 
var timeLeft = questions.length * 10;
var timeID;
var qIndex = 0;


//Functions

function gameStart() {
    timeID = setInterval(timeDown, 1000);
    timerEl.textContent = timeLeft;
    var containerScreenEl = document.getElementById("container-screen");
    containerScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    
    newQuestion();
}



function timeDown() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

function newQuestion() {
    var nowQuestion = questions[qIndex]
    var questionSenEl = document.getElementById("question-sentences")
    questionSenEl.textContent = nowQuestion.prompt;
    infoEl.innerHTML = "";
    
    nowQuestion.options.forEach(function(info, i) {
        var selectBtn = document.createElement("button");
        selectBtn.setAttribute("value", info);
        selectBtn.textContent= i + 1 + ". " + info;
        selectBtn.onclick = questionChoice; 
        infoEl.appendChild(selectBtn);

    });
}

function questionChoice() {
    if (this.value !== questions[qIndex].correct) {
        time -=15;
        if (time < 0 ) {
            time = 0;
        }
        timerEl.textContent = time;
        responseEl.textContent = "WRONG D:";
    }   else {
        responseEl.textContent = "Ez peezy :D";
    }
    responseEl.setAttribute("class", "response");
    
    if (qIndex === questions.length) {
        quizEnd();
    } else {
        newQuestion();
    }
}

function quizEnd()