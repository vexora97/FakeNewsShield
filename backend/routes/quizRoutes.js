const express = require("express");
const { getQuiz } = require("../controllers/quizController");
const router = express.Router();

router.get("/quiz", getQuiz);   // GET /api/quiz

module.exports = router;
