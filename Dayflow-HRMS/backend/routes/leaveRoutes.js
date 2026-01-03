const express = require("express");
const Leave = require("../models/Leave");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/apply", auth, async (req, res) => {
  const leave = await Leave.create({ ...req.body, userId: req.user.id });
  res.json(leave);
});

router.get("/", auth, async (req, res) => {
  const leaves = await Leave.find();
  res.json(leaves);
});

module.exports = router;
