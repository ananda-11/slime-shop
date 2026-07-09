function toggleChat() {

  const chatBox = document.getElementById("chatBox");

  chatBox.style.display =
    chatBox.style.display === "block" ? "none" : "block";

}

async function sendMessage() {

  const input = document.getElementById("userInput").value;
  const chatLog = document.getElementById("chatLog");

  if (!input.trim()) return;

  chatLog.innerHTML += `
    <div class="message-row user">
      <div class="message-bubble">${input}</div>
    </div>
  `;

  document.getElementById("userInput").value = "";

  chatLog.innerHTML += `
    <div class="message-row ai" id="thinkingMessage">
      <img class="avatar" src="C:\\Users\\Student\\Desktop\\slime-shop\\images\\chatbot.jpg" alt="AI">
      <div class="message-bubble thinking">Thinking...</div>
    </div>
  `;

  chatLog.scrollTop = chatLog.scrollHeight;

  const API_KEY = "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";

  const payload = {
    model: "gpt-4o-mini",

    messages: [
      { role: "system", content: "You are a helpful AI assistant for a website. Answer clearly and politely. Give short and concise answers and always ask the user for more information or suggestions." },

      { role: "user", content: input }
    ]
  };

  try {

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },

        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    document.getElementById("thinkingMessage").remove();

    if (data.error) {

      chatLog.innerHTML += `
        <div class="message-row ai">
          <img class="avatar" src="C:\\Users\\Student\\Desktop\\slime-shop\\images\\chatbot.jpg" alt="AI">
          <div class="message-bubble">
            Error: ${data.error.message}
          </div>
        </div>
      `;

      return;

    }

    const reply = data.choices[0].message.content.trim();

    chatLog.innerHTML += `
      <div class="message-row ai">
        <img class="avatar" src="C:\\Users\\Student\\Desktop\\slime-shop\\images\\chatbot.jpg" alt="AI">
        <div class="message-bubble">${reply}</div>
      </div>
    `;

    chatLog.scrollTop = chatLog.scrollHeight;

  }

  catch (error) {

    document.getElementById("thinkingMessage").remove();

    chatLog.innerHTML += `
      <div class="message-row ai">
        <img class="avatar" src="C:\\Users\\Student\\Desktop\\slime-shop\\images\\chatbot.jpg" alt="AI">
        <div class="message-bubble">
          Network error. Check your API key.
        </div>
      </div>
    `;

  }

}
