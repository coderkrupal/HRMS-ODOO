const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: String,
  from: Date,
  to: Date,
  reason: String,
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Leave", leaveSchema);
