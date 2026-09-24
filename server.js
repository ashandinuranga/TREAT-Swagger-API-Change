const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const YAML = require("js-yaml");
const fs = require("fs");
const path = require("path");

const { users, hospitals, patients, encounters } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = "treat-swagger-test-secret"; // fine for a test/mock API only

// ---------- Swagger UI ----------
const swaggerDocument = YAML.load(
  fs.readFileSync(path.join(__dirname, "swagger.yaml"), "utf8")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/swagger.json", (req, res) => {
  res.json(swaggerDocument);
});

// ---------- Auth middleware ----------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

// ---------- Routes ----------

// POST /api/login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ token, expiresIn: "1h" });
});

// GET /api/hospitals
app.get("/api/hospitals", authenticateToken, (req, res) => {
  res.json(hospitals);
});

// GET /api/patients
app.get("/api/patients", authenticateToken, (req, res) => {
  res.json(patients);
});

// GET /api/patients/:id
app.get("/api/patients/:id", authenticateToken, (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  res.json(patient);
});

// GET /api/encounters
app.get("/api/encounters", authenticateToken, (req, res) => {
  res.json(encounters);
});

// GET /api/encounters/:id
app.get("/api/encounters/:id", authenticateToken, (req, res) => {
  const encounter = encounters.find((e) => e.id === req.params.id);
  if (!encounter) {
    return res.status(404).json({ message: "Encounter not found" });
  }
  res.json(encounter);
});

// Root redirect to docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.listen(PORT, () => {
  console.log(`Treat-Swagger API running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
