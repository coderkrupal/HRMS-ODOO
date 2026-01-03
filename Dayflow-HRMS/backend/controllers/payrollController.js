const Payroll = require("../models/Payroll");

/* ===== EMPLOYEE VIEW PAYROLL ===== */
exports.getMyPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.find({ userId: req.user.id });
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payroll" });
  }
};

/* ===== ADMIN ADD PAYROLL ===== */
exports.createPayroll = async (req, res) => {
  if (req.user.role !== "Admin" && req.user.role !== "HR") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const payroll = await Payroll.create(req.body);
    res.status(201).json(payroll);
  } catch (error) {
    res.status(400).json({ message: "Payroll creation failed" });
  }
};
