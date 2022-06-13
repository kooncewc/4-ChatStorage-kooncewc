const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;
const request = new XMLHttpRequest();
const MILLISECONDS_IN_TEN_SECONDS = 10000;

//define local storage variables
MYname = localStorage.setItem("name",JSON.stringify(nameInput));
SAVEName = localStorage.setItem("name",JSON.stringify(nameInput));
const updateButton = document.getElementById("update-button");
const saveButton = document.getElementById("save-button");




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

//if name is empty in local storage, send message,otherwise send message
if (localStorage.getItem('name') != null){
if (sendButton){
sendButton.addEventListener("click", function(sendButtonClickEvent)  {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});
}
}

else {
  JOptionPane.showMessageDialog(null,"You must save a name first!");
}
}


//name update function
function updateName(MYname) {
if (updateButton)
  updateButton.addEventListener("click",function(updateButtonClickEvent) {
  updateButtonClickEvent.preventDefault();
  localStorage.setItem("name",MYname);

});

}
function SaveName(MYname)
{
if (saveButton)
saveButton.addEventListener("click",function(saveButtonClickEvent) {
  saveButtonClickEvent.preventDefault();
  localStorage.setItem("name",MYname);
});

}
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);
updateMessages();

