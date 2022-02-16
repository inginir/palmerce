const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const { ClothingSchema } = require("../schema/clothingSchema");
const http = require("http");
var cors = require("cors");

const PORT = process.env.NODE_DOCKER_PORT || 3002;

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    `mongodb://root:123456@localhost:${process.env.MONGODB_LOCAL_PORT}/`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    db_connected = true;
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

const ClothingDB = mongoose.model("ClothingDB", ClothingSchema);

app.get("/api", (req, res) => {
  res.json({ message: "Bonjour from server!" });
});

app.get("/api/clothing/create", (req, res) => {
  const clothing = new ClothingDB({ name: "hoodie" });
  clothing.save((error) => {
    if (error) {
      res.json({ message: `Error has occurred: ${error}` });
      return console.log(`Error has occurred: ${error}`);
    }
    ClothingDB.find({}, function (error, documents) {
      res.json({ message: documents });
    });
    console.log("Document is successfully saved.");
  });
});

app.get("/api/clothing", (req, res) => {
  ClothingDB.find({}, function (error, documents) {
    res.json({ message: documents });
  });
});

// app.listen(PORT, () => {
//   // console.log(process.env);
//   // console.log(process.env.NODE_DOCKER_PORT);
//   console.log(`Server listening on ${PORT}`);
// });

const server = http.createServer(app);
const socketIo = require("socket.io");
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

  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
