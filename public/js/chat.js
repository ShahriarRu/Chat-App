const socket = io();

const message = document.getElementById("message");
const submit = document.getElementById("submit");
const loc = document.getElementById("location");
const messages = document.getElementById("messages");
// const messageTemplate = document.getElementById("message-template");

submit.addEventListener("click", (e) => {
  e.preventDefault();
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
  let html = `<div>
      <p>${message.text} - ${moment(message.createdAt).format("hh:mm a")}</p>
    </div>`;
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (loc) => {
  let html = `<div>
  <p><a href="${loc.url} - " target='_blank' >My Location</a> - ${moment(
    loc.createdAt
  ).format("hh:mm a")}</p>
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
