const socket = io();

const message = document.getElementById("message");
const submit = document.getElementById("submit");
const loc = document.getElementById("location");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("sendMessage", message.value);
  message.value = "";
});

socket.on("message", (message) => {
  console.log(message);
});

loc.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Your browser doesn't support Geolocation");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});
