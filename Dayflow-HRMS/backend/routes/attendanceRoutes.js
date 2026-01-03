const express = require("express");
const Attendance = require("../models/Attendance");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/checkin", auth, async (req, res) => {
  const attendance = await Attendance.create({
    userId: req.user.id,
    checkIn: new Date().toLocaleTimeString(),
    status: "Present",
  });
  res.json(attendance);
});

router.post("/checkout", auth, async (req, res) => {
  await Attendance.findOneAndUpdate(
    { userId: req.user.id },
    { checkOut: new Date().toLocaleTimeString() }
  );
  res.json({ message: "Checked out" });
});

module.exports = router;
