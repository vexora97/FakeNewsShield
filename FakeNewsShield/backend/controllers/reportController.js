const fs = require("fs");
const path = require("path");

const reportsFile = path.join(__dirname, "../data/reports.json");
const quizFile = path.join(__dirname, "../data/quiz.json");
const allowedPlatforms = ["WhatsApp", "Instagram", "YouTube", "Facebook", "Website", "Other"];

// Helper: read the reports file (returns an empty list if it is missing)
function readReports() {
  try {
    return JSON.parse(fs.readFileSync(reportsFile, "utf8"));
  } catch (error) {
    return [];
  }
}

// POST /api/reports  -> validate, then save into reports.json
exports.createReport = (req, res) => {
  const { name, email, platform, news, reason } = req.body;

  // Required fields
  if (!platform || !news || !reason) {
    return res.status(400).json({ message: "Please complete all required fields." });
  }
  if (!allowedPlatforms.includes(platform)) {
    return res.status(400).json({ message: "Invalid platform." });
  }

  const report = {
    id: Date.now(),
    name: (name || "").toString().trim().slice(0, 80),
    email: (email || "").toString().trim().slice(0, 120),
    platform: platform,
    news: news.toString().trim().slice(0, 1500),
    reason: reason.toString().trim().slice(0, 1500),
    submittedAt: new Date().toISOString()
  };

  try {
    const reports = readReports();
    reports.push(report);
    fs.writeFileSync(reportsFile, JSON.stringify(reports, null, 2));
    res.status(201).json({
      message: "Thank you! Your report has been recorded for the awareness programme."
    });
  } catch (error) {
    res.status(500).json({ message: "Could not save the report." });
  }
};

// GET /api/stats -> simple numbers for the home page
exports.getStats = (req, res) => {
  const questions = JSON.parse(fs.readFileSync(quizFile, "utf8"));
  res.json({ totalReports: readReports().length, quizQuestions: questions.length });
};
