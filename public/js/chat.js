const socket = io();

const message = document.getElementById("message");
const submit = document.getElementById("submit");
const loc = document.getElementById("location");
const messages = document.getElementById("messages");
const sendAudio = document.getElementById("sendAudio");
// const messageTemplate = document.getElementById("message-template");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  sendAudio.play();
  if (!message.value) {
    return;
  }

  socket.emit("sendMessage", message.value, (message) => {
    console.log("message delivered! ", message);
  });

  message.value = "";
  message.focus();
});

socket.on("message", (message) => {
  console.log(message.text);
  let html = `<div  id="message-template class="message"> 
      <p >
        <span class="message__name">${message.username}</span>
        <span class="message__meta">${moment(message.createdAt).format(
          "h:mm a"
        )}</span>
      </p>
      <p style="background: red; width: auto">${message.text}</p>
    </div>`;
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (loc) => {
  let html = `<div class="message">
  <p>
        <span class="message__name">${loc.username}</span>
        <span class="message__meta">${moment(loc.createdAt).format(
          "hh:mm a"
        )}</span>
      </p>
  <p><a href="${loc.url}" target='_blank' >My Location</a></p>
    </div>`;
  messages.insertAdjacentHTML("beforeend", html);
});

loc.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Your browser doesn't support Geolocation");
  }
  loc.setAttribute("disabled", "disabled location button");
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        loc.removeAttribute("disabled");
        console.log("location delivered");
      }
    );
  });
});

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
