const express = require("express");
const { createReport, getStats } = require("../controllers/reportController");
const router = express.Router();

router.post("/reports", createReport);  // POST /api/reports
router.get("/stats", getStats);         // GET  /api/stats

module.exports = router;
