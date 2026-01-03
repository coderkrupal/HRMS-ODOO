const Attendance = require("../models/Attendance");

/* ===== CHECK IN ===== */
exports.checkIn = async (req, res) => {
  try {
    const attendance = await Attendance.create({
      userId: req.user.id,
      checkIn: new Date().toLocaleTimeString(),
      status: "Present",
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Check-in failed" });
  }
};

/* ===== CHECK OUT ===== */
exports.checkOut = async (req, res) => {
  try {
    const attendance = await Attendance.findOneAndUpdate(
      { userId: req.user.id },
      { checkOut: new Date().toLocaleTimeString() },
      { new: true }
    );

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Check-out failed" });
  }
};

/* ===== VIEW ATTENDANCE ===== */
exports.getAttendance = async (req, res) => {
  try {
    const records =
      req.user.role === "Admin" || req.user.role === "HR"
        ? await Attendance.find()
        : await Attendance.find({ userId: req.user.id });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};
