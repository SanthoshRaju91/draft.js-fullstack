const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: "review"
  }
});

module.exports = mongoose.model("Blog", BlogSchema);
