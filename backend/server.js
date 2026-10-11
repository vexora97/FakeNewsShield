const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const quizRoutes = require("./routes/quizRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", quizRoutes);
app.use("/api", reportRoutes);

const angularFolder = path.join(__dirname, "../../frontend/dist/frontend/browser");
if (fs.existsSync(angularFolder)) {
  app.use(express.static(angularFolder));
  app.use((req, res) => res.sendFile(path.join(angularFolder, "index.html")));
}

app.listen(PORT, () => {
  console.log("Fake News Shield API running at http://localhost:" + PORT);
});