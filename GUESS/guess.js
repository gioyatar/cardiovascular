let questionStep = 1;

    const image = document.getElementById("questionImage");
    const input = document.getElementById("answer");
    const result = document.getElementById("result");
    const submitBtn = document.getElementById("submitBtn");

    const questions = [
      {
        answer: "heart failure",
        image: "../img/heartfailure.jpg"
      },
      {
        answer: "hypertension",
        image: "../img/hypertension.jpg"
      },
      {
        answer: "aneurysm",
        image: "../img/aneurysm.jpg"
      },
      {
        answer: "atherosclerosis",
        image: "../img/atheroGuess.jpg"
      }
    ];

    function fadeImage(newSrc) {
      image.style.opacity = 0;
      setTimeout(() => {
        image.src = newSrc;
        image.onload = () => image.style.opacity = 1;
      }, 300);
    }

    function checkAnswer() {
      const userAnswer = input.value.trim().toLowerCase();
      const current = questions[questionStep - 1];

      if (current && userAnswer === current.answer) {
        input.className = "correct";
        result.innerHTML = "✅ Correct!";
        if (questionStep < questions.length) {
          fadeImage(questions[questionStep].image);
          result.innerHTML += " Moving to the next question.";
          questionStep++;
        } else {
          result.innerHTML += " 🎉 Quiz complete!";
          input.disabled = true;
          submitBtn.disabled = true;
        }
      } else {
        input.className = "incorrect";
        result.innerHTML = "❌ Incorrect. Try again.";
      }

      input.value = "";
      input.focus();
    }