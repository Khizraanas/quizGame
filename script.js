var questions = [
    {
      question: "Which tag is used to include JavaScript in an HTML file?",
      answers: [
        { text: "<script>", correct: true },
        { text: "<java>", correct: false },
        { text: "<js>", correct: false },
        { text: "<style>", correct: false }
      ]
    },
    {
      question: "What is the output of typeof 42?",
      answers: [
        { text: "string", correct: false },
        { text: "number", correct: true },
        { text: "boolean", correct: false },
        { text: "undefined", correct: false }
      ]
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
      answers: [
        { text: "boolean", correct: false },
        { text: "float", correct: true },
        { text: "number", correct: false },
        { text: "string", correct: false }
      ]
    }
  ];
  
  var currentQuestionIndex = 0;
  var score = 0;
  
  var questionElement = document.getElementById("question");
  var answerButtonsElement = document.getElementById("answer-buttons");
  var nextButton = document.getElementById("next-btn");
  var resultElement = document.getElementById("result");
  
  function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    nextButton.style.display = "none";
    resultElement.innerHTML = "";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      var button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    resultElement.innerHTML = "";
  }
  
  function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct === "true";
    
    if (correct) {
      score++;
      resultElement.innerHTML = "Correct!";
      resultElement.style.color = "white";
    } else {
      resultElement.innerHTML = "Incorrect!";
      resultElement.style.color = "black";
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct === "true") {
        button.style.backgroundColor = "green";
      } else {
        button.style.backgroundColor = "#FF5B61";
      }
    });
  
    if (questions.length > currentQuestionIndex + 1) {
      nextButton.style.display = "block";
    } else {
      nextButton.innerText = "Show Score";
      nextButton.style.display = "block";
    }
  }
  
  function showScore() {
    resultElement.innerHTML = `Final Score: ${score} / ${questions.length}`;
    nextButton.style.display = "none";
    questionElement.innerHTML = "Quiz Completed!";
    answerButtonsElement.innerHTML = "";
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (questions.length > currentQuestionIndex) {
      showQuestion();
    } else {
      showScore();
    }
  });
  
  startGame();
  