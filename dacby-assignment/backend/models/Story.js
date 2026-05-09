const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: String,
  url: String,
  points: Number,
  author: String,
  postedAt: String,
  bookmarkedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Story", storySchema);