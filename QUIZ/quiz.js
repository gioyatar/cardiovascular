// Justine
// Wag niyo kalikutin to ayos na

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }
  
  // Dito naka store mga tanong wag kayo magbura
  const questions = [
    {
      text: "When the heart can't pump enough blood for the body’s needs.",
      choices: ["Hemophilia", "Arrhythmia", "Anemia", "Heart Failure"],
      correctIndex: 3
    },
    {
      text: "Hardening and narrowing of the arteries due to plaque buildup.",
      choices: ["Atherosclerosis", "Leukemia", "Angina", "Asthma"],
      correctIndex: 0
    },
    {
      text: "Increases risk of heart attack, stroke and heart failure.",
      choices: ["Hypoglycemia", "Bronchitis", "Varicose veins", "Hypertension"],
      correctIndex: 3
    },
    {
      text: "Irregular heartbeat that may be too fast, too slow or erratic.",
      choices: ["Arrhythmia", "Embolism", "Anemia", "Stroke"],
      correctIndex: 0
    },
    {
      text: "A decrease in red blood cells or hemoglobin causing fatigue.",
      choices: ["Leukemia", "Thrombosis", "Anemia", "Aneurysm"],
      correctIndex: 2
    },
    {
      text: "Blood clot that forms in a vein, often in the legs.",
      choices: ["Cardiomyopathy", "Thrombosis", "Asthma", "Plaque"],
      correctIndex: 1
    },
    {
      text: "Chest pain due to reduced blood flow to the heart.",
      choices: ["Angina", "Anemia", "Bronchitis", "Tachycardia"],
      correctIndex: 0
    },
    {
      text: "Rupture or ballooning of a blood vessel due to weakness.",
      choices: ["Thrombosis", "Stroke", "Aneurysm", "Myocarditis"],
      correctIndex: 2
    },
    {
      text: "A condition that involves cancer of the blood or bone marrow.",
      choices: ["Leukemia", "Hypertension", "Atherosclerosis", "Embolism"],
      correctIndex: 0
    },
    {
      text: "Swollen and twisted veins usually seen in legs.",
      choices: ["Arrhythmia", "Aneurysm", "Varicose veins", "Embolism"],
      correctIndex: 2
    }
  ];
  
    const shuffledQuestions = shuffle([...questions]).map((question) => {
    const originalChoices = [...question.choices];
    const correctAnswer = originalChoices[question.correctIndex];
    const shuffledChoices = shuffle([...originalChoices]);
    const newCorrectIndex = shuffledChoices.indexOf(correctAnswer);
  
    return {
      text: question.text,
      choices: shuffledChoices,
      correctIndex: newCorrectIndex
    };
  });
  
  let currentQuestionIndex = 0;
  const userAnswers = new Array(shuffledQuestions.length).fill(null);
  
  const questionText = document.getElementById("question");
  const choicesContainer = document.getElementById("choices");
  const prevButton = document.getElementById("prevBtn");
  const nextButton = document.getElementById("nextBtn");
  
  function loadQuestion() {
    const current = shuffledQuestions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${current.text}`;
  
    choicesContainer.innerHTML = "";
  
    current.choices.forEach((choice, index) => {
      const label = document.createElement("label");
      label.classList.add("choice");
      label.innerHTML = `
        <input type="radio" name="choice" value="${index}">
        ${choice}
      `;
      choicesContainer.appendChild(label);
      choicesContainer.appendChild(document.createElement("br"));
    });
  
    const savedAnswer = userAnswers[currentQuestionIndex];
    if (savedAnswer !== null) {
      const radios = document.getElementsByName("choice");
      radios[savedAnswer].checked = true;
    }
  
    prevButton.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    nextButton.textContent = currentQuestionIndex === shuffledQuestions.length - 1 ? "Submit" : "Next";
  }
  
  nextButton.addEventListener("click", () => {
    const selected = document.querySelector('input[name="choice"]:checked');
    if (selected) {
      userAnswers[currentQuestionIndex] = parseInt(selected.value);
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
      } else {
        showResults();
      }
    } else {
      alert("Please select an answer before continuing.");
    }
  });
  
  prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      loadQuestion();
    }
  });
  
  function showResults() {
    let score = 0;
    let examStateIMG;
    let examStateMessage;
    const passIMGPath = '../img/cool.png';
    const failIMGPath = '../img/Sad.png';

    shuffledQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.correctIndex) {
        score++;
      }
    });

    if (score < 5) {
        examStateIMG = failIMGPath;
        examStateMessage = "Goodluck next time :'(";
    } else {
        examStateIMG = passIMGPath;
        examStateMessage = "Great Job :D";
    }
  
    document.getElementById("quiz-container").innerHTML = `
      <h2 style="color: #800000; font-weight: bold; text-transform: uppercase;">Quiz Completed</h2>
      <p style="color: #800000; font-weight: bold; text-transform: uppercase;">Your score: ${score} out of ${shuffledQuestions.length}</p>
      <center>
        <img src="${examStateIMG}" style="height: 115px; width: 115px;">
        <p style="font-weight: bold;">${examStateMessage}</p>
      </center>

    `;
  }
  
  loadQuestion();
  