const fs = require("fs");
const path = require("path");

const quizFile = path.join(__dirname, "../data/quiz.json");

// Read quiz.json and send the questions to Angular
exports.getQuiz = (req, res) => {
  try {
    const questions = JSON.parse(fs.readFileSync(quizFile, "utf8"));
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Could not load the quiz." });
  }
};
