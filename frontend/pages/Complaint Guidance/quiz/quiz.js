// quiz.js (نسخه‌ی اصلاح‌شده و کامل)

const questions = window.quizQuestions || [];
let current = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const progress = document.getElementById("progress");
const scoreCard = document.getElementById("score-card");
const scoreText = document.getElementById("score-text");
const message = document.getElementById("message");

// اگر سوالی وجود نداشت
if (!questions.length) {
  if (questionText) questionText.textContent = "سؤالی یافت نشد.";
  throw new Error("quizQuestions is empty or not defined");
}

// تابع برای بارگذاری هر سوال
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

  // پیشرفت (progress bar)
  const percent = Math.round(((current + 1) / questions.length) * 100);
  if (progress) progress.style.width = percent + "%";
}

// بررسی پاسخ کاربر
function checkAnswer(element, correct) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => opt.style.pointerEvents = "none"); // جلوگیری از کلیک مجدد

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

// نمایش نتیجه نهایی
function showResults() {
  if (questionText) questionText.style.display = "none";
  if (optionsBox) optionsBox.style.display = "none";
  if (progress) progress.style.width = "100%";
  if (scoreCard) scoreCard.style.display = "block";

  const finalScore = Math.round(score);
  if (scoreText) scoreText.innerText = `نتیجه: ${finalScore} از ۱۰۰`;

  if (message) {
    if (finalScore >= 80) {
      message.innerText = "🌟 درود بر تو! دانشت ستودنی است و نشان از تلاش و آگاهی ژرف تو دارد.";
    } else if (finalScore >= 50) {
      message.innerText = "🙂 گام‌های خوبی برداشته‌ای، با اندکی پشتکار می‌توانی به اوج برسی.";
    } else {
      message.innerText = "⚠️ شکست، پایان راه نیست؛ فرصتی است برای آموختن و دوباره درخشش یافتن.";
    }
  }

  // دکمه‌ی شروع دوباره
  const retryBtn = document.createElement("button");
  retryBtn.textContent = "🔁 شروع دوباره";
  retryBtn.className = "retry-btn";
  retryBtn.onclick = () => location.reload();
  scoreCard.appendChild(retryBtn);
}

// شروع کوییز
if (progress) progress.style.width = "0%";
loadQuestion();
