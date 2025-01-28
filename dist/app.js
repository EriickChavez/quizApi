"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
// Routes import
const users_1 = __importDefault(require("./routes/users"));
const log_1 = __importDefault(require("./routes/log"));
const validation_1 = __importDefault(require("./routes/validation"));
const routes_1 = __importDefault(require("./routes"));
// Middlewares import
const authenticate_1 = __importDefault(require("./middlewares/authenticate"));
const disabled_1 = __importDefault(require("./middlewares/disabled"));
// Application
const app = (0, express_1.default)();
// Rate limiting middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
});
// Apply rate limiting to all requests
app.use(limiter);
// Enable CORS
app.use((0, cors_1.default)());
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Root url
app.get("/", (req, res) => {
    res.status(200).json({
        status: "operational",
        message: "Light API - Lightweight Express Boilerplate",
        features: [
            "🔄 Routes handling",
            "🔐 User authentication with JWT",
            "💾 MySQL2 / Postgres basic functions",
            "📧 Nodemailer included",
            "🔧 Configuration with DotEnv",
            "📝 Winston logging",
            "📡 CORS enabled",
            "🚫 Rate limiting",
            "🔍 Joi validation",
            "🛡️ Middleware ready",
            "📦 Modular structure",
            "🔒 Disabled route middleware",
            "🚀 Works out of the box!",
        ],
    });
});
// Those routes are only examples routes to inspire you or to get you started faster.
// You are not forced to use them, and can erase all routes in order to make your own.
// Nested routes (routes are stored in the routes folder)
app.use("/users", users_1.default);
app.use("/api", authenticate_1.default, routes_1.default); // '/api' routes are protected with the 'authenticate' middleware
app.use("/log", log_1.default);
app.use("/validation", validation_1.default);
// Root routes
// curl -X GET http://localhost:5005/welcome
app.get("/welcome", (req, res) => {
    res.json({ message: "Welcome" });
});
// curl -X GET http://localhost:5005/disabled
// This route is disabled by the middleware
app.get("/disabled", disabled_1.default, (req, res) => {
    res.json({ message: "This route is disabled, you cannot see this message." });
});
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // logger.info(`Server is running on port ${PORT}`); Use this line if you want to log the startup
});
