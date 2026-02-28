const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const { swaggerUi, specs } = require("./swagger");
const errorHandler = require("./middleware/errorMiddleware");

connectDB();

const app = express();

/* ================= SECURITY MIDDLEWARE ================= */

// Helmet
app.use(helmet());

// Morgan logger
app.use(morgan("dev"));

// ✅ FINAL WORKING CORS (Production Safe)
app.use(cors({
  origin: true,              // Allow all origins
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});

app.use(limiter);

// Body parser
app.use(express.json());

/* ================= ROUTES ================= */

// Root test route
app.get("/", (req, res) => {
  res.json({ message: "Backend Running Successfully" });
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// API routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);