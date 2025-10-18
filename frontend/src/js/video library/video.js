const btn = document.getElementById("showBtn");
const text = document.getElementById("fullText");

window.addEventListener("DOMContentLoaded", () => {
  text.style.height = "0px";
  btn.textContent = "معلومات بیشتر";
});

btn.addEventListener("click", () => {
  if (!text.classList.contains("open")) {
    // باز شدن نرم و خودکار بر اساس ارتفاع واقعی
    text.style.height = text.scrollHeight + "px";
    text.classList.add("open");
    btn.textContent = "بستن توضیحات";
  } else {
    // بستن نرم و برگشتن به صفر
    text.style.height = "0px";
    text.classList.remove("open");
    btn.textContent = "معلومات بیشتر";
  }
});
