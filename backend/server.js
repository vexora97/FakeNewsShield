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

// Find the built Angular website (the folder name differs between Angular versions)
const distRoot = path.join(__dirname, "../frontend/dist/frontend");
const angularFolder = [path.join(distRoot, "browser"), distRoot].find((folder) =>
  fs.existsSync(path.join(folder, "index.html"))
);

if (angularFolder) {
  console.log("Serving Angular from: " + angularFolder);
  app.use(express.static(angularFolder));
  // Any other address (like /quiz) -> index.html so Angular routing works on refresh
  app.use((req, res) => res.sendFile(path.join(angularFolder, "index.html")));
} else {
  console.log("Angular build not found in: " + distRoot);
}

app.listen(PORT, () => {
  console.log("Fake News Shield API running at http://localhost:" + PORT);
});