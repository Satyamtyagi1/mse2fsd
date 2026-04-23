const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  itemName: String,
  description: String,
  type: String, // Lost / Found
  location: String,
  date: { type: Date, default: Date.now },
  contact: String
});

module.exports = mongoose.model("Item", ItemSchema);
