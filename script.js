const container = document.querySelector('.bubble-container');

document.addEventListener('mousemove', (e) => {
  // Create the bubble element
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // Generate a random size for bubble variety (e.g., 10px to 30px)
  const size = Math.random() * 20 + 10;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Position the bubble at the cursor (using e.clientX/Y)
  bubble.style.left = `${e.clientX - size / 2}px`;
  bubble.style.top = `${e.clientY - size / 2}px`;

  // Add to the container
  container.appendChild(bubble);

  // Remove the bubble after 1.5 seconds to clean up the DOM
  setTimeout(() => {
    bubble.remove();
  }, 1500);
});








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
      <img class="avatar" src="images/chatbot.jpg" alt="AI">
      <div class="message-bubble thinking">Thinking...</div>
    </div>
  `;

  chatLog.scrollTop = chatLog.scrollHeight;

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
          <img class="avatar" src="images/chatbot.jpg" alt="AI">
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
        <img class="avatar" src="images/chatbot.jpg" alt="AI">
        <div class="message-bubble">${reply}</div>
      </div>
    `;

    chatLog.scrollTop = chatLog.scrollHeight;

  }

  catch (error) {
    console.log(error);
    document.getElementById("thinkingMessage").remove();

    chatLog.innerHTML += `
      <div class="message-row ai">
        <img class="avatar" src="images/chatbot.jpg" alt="AI">
        <div class="message-bubble">
          Network error. Check your API key.
        </div>
      </div>
    `;

  }

}
