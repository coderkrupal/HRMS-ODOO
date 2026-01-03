const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
  checkIn: String,
  checkOut: String,
  status: String,
});

module.exports = mongoose.model("Attendance", attendanceSchema);
