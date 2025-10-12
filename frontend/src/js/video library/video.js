const btn = document.getElementById("showBtn");
const text = document.getElementById("fullText");

btn.addEventListener("click", () => {
  if (text.style.display === "none" || text.style.display === "") {
    text.style.display = "block"; // نمایش متن
    btn.textContent = "معلومات بیشتر"; // تغییر متن دکمه
  } else {
    text.style.display = "none"; // مخفی کردن متن
    // btn.textContent = "معلومات بیشتر"; // بازگشت به نام اصلی دکمه
  }
});
