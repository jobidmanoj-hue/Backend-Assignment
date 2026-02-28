const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const { swaggerUi, specs } = require("./swagger");

connectDB();

const app = express();

// 🔐 Security Middlewares (FIRST)
app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://backend-assignment-phi-two.vercel.app",
    "https://backend-assignment-qqs7m5h5s-jobidmanoj-hues-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));app.use(express.json());
app.use(morgan("dev"));

// 🚦 Rate Limiter (BEFORE ROUTES)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// ✅ Root Route
app.get("/", (req, res) => {
  res.json({ message: "Backend Running Successfully" });
});

// 📄 Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// 📌 API Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

// ❌ 404 Handler (AFTER ROUTES)
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// 🔥 Global Error Handler (LAST)
const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);