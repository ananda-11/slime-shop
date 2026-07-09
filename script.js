const container = document.querySelector('.bubble-container');
userisloggedin = false;


const spacingDelay = 120; 
let lastSpawnTime = 0;

document.addEventListener('mousemove', (e) => {
  const currentTime = Date.now();

  if (currentTime - lastSpawnTime < spacingDelay) {
    return; 
  }
  lastSpawnTime = currentTime;

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  let size;
  const sizeRoll = Math.random();
  
  if (sizeRoll < 0.4) {
    size = Math.random() * 30 + 15;
  } else if (sizeRoll < 0.8) {
    size = Math.random() * 50 + 60;
  } else {
    size = Math.random() * 80 + 140;
  }
  
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  bubble.style.left = `${e.clientX - size / 2}px`;
  bubble.style.top = `${e.clientY - size / 2}px`;

  container.appendChild(bubble);

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

const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (userIsLoggedIn) {
  console.log("User is logged in on this page!");
}

if(localStorage.getItem('username') !== null && localStorage.getItem('password') !== null) { 
    document.getElementById('login-btn').style.display = 'none';
    const usernameDisplay = document.createElement('span');
    usernameDisplay.id = 'username-display';
    usernameDisplay.textContent = `Welcome, ${localStorage.getItem('username')}!`;
    document.querySelector('.navbar').appendChild(usernameDisplay);
}
localStorage.setItem("isLoggedIn", "true");