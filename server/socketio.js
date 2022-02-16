const mongoose = require("mongoose");
const socketIo = require("socket.io");
const { ClothingSchema } = require("../schema/clothingSchema");

const ClothingDB = mongoose.model("ClothingDB", ClothingSchema);

const intializeSocketIo = (server) => {
  const io = socketIo(server, {
    //TODO: remove cors allow for security purposes
    //TODO: add dev flag to allow cors for development
    cors: {
      origin: "*",
    },
  }); // < Interesting!
  io.on("connection", (socket) => {
    console.log("socket connection");
    // either with send()
    socket.send("Hello!");

    // or with emit() and custom event names
    socket.emit("greetings", "Hey!", { ms: "jane" }, Buffer.from([4, 3, 3, 1]));

    // handle the event sent with socket.send()
    socket.on("message", (data) => {
      console.log(data);
    });

    socket.on("get_clothing", (data) => {
      ClothingDB.find({}, function (error, documents) {
        socket.emit("send_clothing", documents);
      });
      // console.log(data);
    });

    // handle the event sent with socket.emit()
    socket.on("salutations", (elem1, elem2, elem3) => {
      console.log(elem1, elem2, elem3);
    });
  });
};

module.exports = {intializeSocketIo}