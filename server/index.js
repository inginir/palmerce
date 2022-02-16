const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const { ClothingSchema } = require("../schema/clothingSchema");
const http = require("http");
var cors = require("cors");
const { intializeSocketIo } = require("./socketio");

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
  const clothing = new ClothingDB({ name: "hoodie8" });
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

const server = http.createServer(app);


intializeSocketIo(server);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
