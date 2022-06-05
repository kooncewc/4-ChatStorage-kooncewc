const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;
const request = new XMLHttpRequest();
const MILLISECONDS_IN_TEN_SECONDS = 10000;



function updateMessagesInChatBox(request){
  fetchMessages();
  const response = JSON.parse(request.responseText)
  chatBox.innerHTML = request.responseText;

  }


function fetchMessages(){

  return new Promise((resolve,reject) =>{
    request.onreadystatechange = function () {
      if(request.readyState !== request.DONE) {return;}
      if(request.stats !== 200) {
          return reject('request failed');
      }
      resolve(request.responseText);
    };
 request.open('GET','https://it3049c-chat-application.herokuapp.com/messages ');
 request.send();

 return fetch(serverURL)
 .then(response  => response.json())
  })


  }
  async function updateMessages() {
    try {
      const messages = await fetchMessages();
      const ParsedMessage = JSON.parse(response);
      chatBox.innerHTML = response;
      let formattedMessages = "";
    messages.forEach(message => {
        formattedMessages += formatMessage(message, nameInput.value);
    });
    chatBox.innerHTML = formattedMessages;
} catch (error) {
      console.log(error);
      
    }
}

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}

function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch (serverURL, {
      method: `POST`, 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}
if (sendButton){
sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});
}
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);
updateMessages();

