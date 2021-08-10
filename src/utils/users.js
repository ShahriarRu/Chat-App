let users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: "Username and room are required",
    };
  }
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  if (existingUser) {
    return {
      error: "Try another room or username",
    };
  }
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removedUser = (id) => {
  const index = users.findIndex((user) => user.id == id);
  if (index !== -1) {
    return users.splice(index, 1);
  }
};

const getUser = (id) => {
  return users.find((user) => user.id == id);
};

const getUsersInRoom = (id) => {
  room = room.trim().toLowerCase();
  return users.find((user) => user.room == room);
};

addUser({
  id: 22,
  username: "Shahriar ",
  room: "Love ",
});

addUser({
  id: 32,
  username: "Shahriar ",
  room: "Love ",
});

addUser({
  id: 42,
  username: "Shahriar ",
  room: "Love dna",
});

const rm = getUser(42);
console.log(rm);
