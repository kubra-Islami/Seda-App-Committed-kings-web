const questions = window.quizQuestions; 
let current = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const progress = document.getElementById("progress");
const scoreCard = document.getElementById("score-card");
const scoreText = document.getElementById("score-text");
const message = document.getElementById("message");

function loadQuestion() {
  const q = questions[current];
  questionText.textContent = q.text;
  optionsBox.innerHTML = "";
  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => checkAnswer(div, i === q.correct);
    optionsBox.appendChild(div);
  });
  progress.style.width = (current / questions.length) * 100 + "%";
}

function checkAnswer(element, correct) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => opt.style.pointerEvents = "none");

  if (correct) {
    element.classList.add("correct");
    score += 100 / questions.length;
  } else {
    element.classList.add("wrong");
  }

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 900);
}

function showResults() {
  questionText.style.display = "none";
  optionsBox.style.display = "none";
  progress.style.width = "100%";
  scoreCard.style.display = "block";
  scoreText.innerText = `نتیجه: ${Math.round(score)} از ۱۰۰`;

 if (score >= 80) {
  message.innerText = "🌟 درود بر تو! دانشت ستودنی است و نشان از تلاش و آگاهی ژرف تو دارد.";
} else if (score >= 50) {
  message.innerText = "🙂 گام‌های خوبی برداشته‌ای، با اندکی پشتکار می‌توانی به اوج برسی.";
} else {
  message.innerText = "⚠️ شکست، پایان راه نیست؛ فرصتی است برای آموختن و دوباره درخشش یافتن.";
}

}

loadQuestion();
