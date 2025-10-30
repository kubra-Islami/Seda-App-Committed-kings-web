let chatBox = document.getElementById("chat-box");
let userInput = document.getElementById("user-input");
let sendBtn = document.getElementById("send-btn");

//  افزودن پیام به صفحه
function addMessage(sender, text, isHTML = false) {
    let msg = document.createElement("div");
    msg.className = sender === "user" ? "message user-message" : "message bot-message";

    if (isHTML) msg.innerHTML = text;
    else msg.innerText = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msg;
}

//  افکت تایپ تدریجی
function typeMessage(element, text, speed = 35) {
    let index = 0;
    let interval = setInterval(() => {
        element.textContent += text.charAt(index);
        index++;
        chatBox.scrollTop = chatBox.scrollHeight;

        if (index >= text.length) clearInterval(interval);
    }, speed);
}


//  ارسال پیام کاربر
async function sendMessage() {
    let question = userInput.value.trim();
    if (!question) return;

    addMessage("user", question);
    userInput.value = "";

    //  نمایش انیمیشن Thinking
    let thinkingHTML = `
        <div class="thinking-text">
          <span>.</span><span>.</span><span>.</span>  <span>g</span><span>n</span><span>i</span><span>k</span><span>n</span><span>i</span><span>h</span><span>T</span>
        </div>
    `;
    let thinkingMsg = addMessage("bot", thinkingHTML, true);

    try {
        let res = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: question })
        });
        let data = await res.json();

        //  تاخیر طبیعی برای حس واقعی‌تر
        await new Promise(resolve => setTimeout(resolve, 1500));

        // حذف پیام Thinking
        thinkingMsg.remove();

        //  تایپ تدریجی پاسخ
        const botMsg = addMessage("bot", "");
        typeMessage(botMsg, data.reply, 35);

    } catch (err) {
        thinkingMsg.remove();
        addMessage("bot", "Sorry! I can't respond right now. Please try again in a few moments.");
        console.error(err);
    }
}

// رویدادها
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
