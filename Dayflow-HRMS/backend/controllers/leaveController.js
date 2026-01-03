const Leave = require("../models/Leave");

/* ===== APPLY FOR LEAVE ===== */
exports.applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create({
      userId: req.user.id,
      ...req.body,
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: "Leave application failed" });
  }
};

/* ===== VIEW LEAVES ===== */
exports.getLeaves = async (req, res) => {
  try {
    const leaves =
      req.user.role === "Admin" || req.user.role === "HR"
        ? await Leave.find()
        : await Leave.find({ userId: req.user.id });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
};

/* ===== APPROVE / REJECT LEAVE ===== */
exports.updateLeaveStatus = async (req, res) => {
  if (req.user.role !== "Admin" && req.user.role !== "HR") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updatedLeave);
  } catch (error) {
    res.status(400).json({ message: "Leave update failed" });
  }
};
