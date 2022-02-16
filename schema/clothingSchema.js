const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClothingSchema = new Schema({
    name: String
  });


module.exports = { ClothingSchema };