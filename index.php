<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <title>Slimiez</title>        
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="style.css" rel="stylesheet" > 

        <style>
            img {
                border-radius: 15px;
                margin: 20px;
            }
            h3 {font-size:1.5rem;}
            h1 {text-align: center;}
            p {text-align: center;}
            .activ {
                transition: rotate 0.2s ease;
                width: 250px;
                height: 250px;
                align-items: center;
                justify-content: center;
            }
            .activ:hover {rotate: 720deg;}
            .row {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            

        </style>

    </head>
    <body>
     
     
        <div class="bubble-container"></div>

        <div class="box-section">
            <nav class="navbar" style="width: 1000px;">
                    <a class="navbar-brand" href="index.php">Slimy shop</a>
                <div>
                    <button onclick="window.location.href='calendar.php'">Calendar</button>
                    <button onclick="window.location.href='gallery.php'">Moments</button>
                    <button id="login-btn" onclick="window.location.href='signin.php'">Sign in/up</button>
                </div>
            </nav>

            <div class="container">
                <img src="images\logo.png" alt="Slimy Shop Logo" class="img-fluid mx-auto d-block">
              
                <div class="row">
                    <div class="slime-card" class="col">
                        <a href="https://ogslimes.com/collections/all-slimes/products/og-labo" target="_blank">
                            <img class="slimeimage" src="images\OGSlimes26.webp">
                        </a>
                        <h3> OG Labo 🕯️</h3>
                        <p class="description">Santal 33 type scented slay slime</p>
                        <p class="price">$15.69</p>
                    </div>
                

                    <div class="slime-card" class="col">
                        <a href="https://ogslimes.com/products/pink-rhodochrosite?_pos=1&_psq=pink+r&_psid=729845649&_ss=e&_v=1.0" target="_blank">
                            <img class="slimeimage" src="images/pink_rhodochrosite.webp">
                        </a>
                        <h3> Pink Rhodochrosite 🌸</h3>
                        <p class="description">Icee x Cloud Dough texture. Super satisfying</p>
                        <p class="price">$15.99</p>
                    </div>

                    <div class="slime-card" class="col">
                        <a href="https://ogslimes.com/products/gorilla-gloo?_pos=1&_psq=gorilla&_psid=a2c34cbbd&_ss=e&_v=1.0" target="_blank">
                            <img class="slimeimage" src="images/gorillagloo.webp">
                        </a>
                        <h3> Gorilla Gloo 🦍</h3>
                        <p class="description">Choco Banana Milkshake scented slime with clacky clicks</p>
                        <p class="price">$16.99</p>
                    </div>
                
                </div>
                <div class="row">
                    <div class="slime-card">
                        <a href="https://ogslimes.com/collections/all-slimes/products/ponyo" target="_blank">
                            <img class="slimeimage" src="images/ponyo.webp">
                        </a>
                        <h3> Ponyo 🐟</h3>
                        <p class="description">Bubble bead textured stretchy slime</p>
                        <p class="price">$18.99</p>
                    </div>

                <div class="slime-card">
                        <a href="https://ogslimes.com/collections/all-slimes/products/peacock-ore" target="_blank">
                            <img class="slimeimage" src="images/peacockore.webp">
                        </a>                    <h3> Peacock Ore 🦚</h3>
                    <p class="description">Lava rock texture slime that smells like sweet apples</p>
                    <p class="price">$18.99</p>
                </div>


                <div class="slime-card">
                    <a href="https://ogslimes.com/collections/all-slimes/products/activator-pen" target="_blank">
                        <img class="activ" class="slimeimage" src="images\Activator_Spray_8ff10929-749e-4c9c-ac26-810651e19b2c.webp">
                    </a>

                    <h3> Activator pen </h3>
                    <p class="description">fix sticky slime immidentidety. Perfevt for on the go</p>
                    <p class="price">$2.99</p>
                </div>

                <button class="chat-button" onclick="toggleChat()">💬</button>

                <div class="chat-box" id="chatBox">

                    <div class="chat-header">
                        <img src="images/chatbot.jpg" alt="Assistant">

                        <div>
                            <strong>AI Assistant</strong><br>
                            <small>Ask me anything!</small>
                        </div>
                    </div>

                    <div class="chat-messages" id="chatLog">
                        <div class="message-row ai">
                            <img class="avatar" src="images/chatbot.jpg" alt="AI">

                            <div class="message-bubble">Hi! How can I help you today?</div>
                        </div>
                    </div>

                    <div class="chat-input-area">
                        <input
                            id="userInput"
                            type="text"
                            placeholder="Type your message..."
                        >
                        <button onclick="sendMessage()">Send</button>
                    </div>

                </div>

                <script src="api_key.js"></script>
                <script src="script.js"></script>
            </div>
        </div>

        <h1>! Slime Hub ! </h1>
            <div id="chat-hub">
            <div id="message-display"></div>
        
            <div class="container">
                <form id="chat-input-form">
                    <input type="text" id="chat-input1" placeholder="Type your name..." />
                    <input type="text" id="chat-input2" placeholder="Type a message..." />
                    <button type="submit">Send</button>
                </form>            
            </div>
        </div>

        <script>

            const form = document.getElementById('chat-input-form');
            const username = document.getElementById('chat-input1');
            const mess = document.getElementById('chat-input2');
            const display = document.getElementById('message-display');

            form.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameText = username.value.trim();
            const messageText = mess.value.trim();
            
            if (usernameText !== '' && messageText !== '') {
                const messageNode = document.createElement('p');
                messageNode.textContent = `${usernameText}: ${messageText}`;
                display.appendChild(messageNode);
                
                form.reset(); 
                display.scrollTop = display.scrollHeight;
            }
            });


        </script>


    </body>
</html>

