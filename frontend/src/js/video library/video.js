const btn = document.getElementById("showBtn");
const text = document.getElementById("fullText");

// اطمینان از اینکه متن هنگام بارگذاری صفحه پنهان است
window.addEventListener("DOMContentLoaded", () => {
  text.style.display = "none";
  btn.textContent = "معلومات بیشتر";
});

// اضافه کردن رویداد کلیک
btn.addEventListener("click", () => {
  if (text.style.display === "none") {
    text.style.display = "block";
    btn.textContent = "بستن توضیحات"; // تغییر نام دکمه
  } else {
    text.style.display = "none";
    btn.textContent = "معلومات بیشتر"; // برگشت به حالت قبلی
  }
});
