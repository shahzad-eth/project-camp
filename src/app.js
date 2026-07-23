import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//basic configs
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//cors configs
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// HealthCheck base route setup
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);

app.get("/", (req, res) => {
  res.send("Surprize ^_^");
});

// Global error Handler
app.use((err, req, res, next) => {

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors
    })
  }

  // unexpected error (e.g., Syntax error, DB connection drop)
  console.error("UNEXPECTED ERROR: ", err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
})

export default app;
