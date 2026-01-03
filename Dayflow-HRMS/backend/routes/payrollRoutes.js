const express = require("express");
const Payroll = require("../models/Payroll");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ===== EMPLOYEE: VIEW OWN PAYROLL ===== */
router.get("/my", auth, async (req, res) => {
  try {
    const payroll = await Payroll.find({ userId: req.user.id });
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payroll" });
  }
});

/* ===== ADMIN/HR: ADD OR UPDATE PAYROLL ===== */
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "Admin" && req.user.role !== "HR") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const payroll = await Payroll.create(req.body);
    res.status(201).json(payroll);
  } catch (error) {
    res.status(400).json({ message: "Payroll update failed" });
  }
});

module.exports = router;
