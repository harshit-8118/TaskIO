const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment_text: { type: String, required: true },
    user_id: {type: String, required: true},
    user_email: {type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema, "comments");
