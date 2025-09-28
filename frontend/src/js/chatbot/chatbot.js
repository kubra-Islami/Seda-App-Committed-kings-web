let chatBox = document.getElementById("chat-box");
let userInput = document.getElementById("user-input");
let sendBtn = document.getElementById("send-btn");

function addMessage(sender, text) {
    let msg = document.createElement("div");
    msg.className = sender === "user" ? "message user-message" : "message bot-message";
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    let question = userInput.value.trim();
    if (!question) return;

    addMessage("user", question);
    userInput.value = "";

    let res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
    });

    let data = await res.json();
    addMessage("bot", data.reply);
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});