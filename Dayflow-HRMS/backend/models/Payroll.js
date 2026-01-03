const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  salary: Number,
  month: String,
});

module.exports = mongoose.model("Payroll", payrollSchema);
