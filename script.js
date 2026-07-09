const container = document.querySelector('.bubble-container');

// CONFIGURATION: Increased to 120ms for heavy separation and distinct gaps
const spacingDelay = 120; 
let lastSpawnTime = 0;

document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();

  // Forces a strict gap between bubble spawns
  if (currentTime - lastSpawnTime < spacingDelay) {
    return; 
  }
  lastSpawnTime = currentTime;

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // HIGH VARIANCE SIZE LOGIC: 
  // Math.random() determines if it's a tiny bubble or a giant bubble.
  // This yields a chaotic, highly distinct mix of sizes.
  let size;
  const sizeRoll = Math.random();
  
  if (sizeRoll < 0.4) {
    // 40% chance to be a small accent bubble (15px to 45px)
    size = Math.random() * 30 + 15;
  } else if (sizeRoll < 0.8) {
    // 40% chance to be a large bubble (60px to 110px)
    size = Math.random() * 50 + 60;
  } else {
    // 20% chance to be a massive giant bubble (140px to 220px)
    size = Math.random() * 80 + 140;
  }
  
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Center under cursor perfectly
  bubble.style.left = `${e.clientX - size / 2}px`;
  bubble.style.top = `${e.clientY - size / 2}px`;

  container.appendChild(bubble);

  // Clean up the DOM
  setTimeout(() => {
    bubble.remove();
  }, 2000);
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
