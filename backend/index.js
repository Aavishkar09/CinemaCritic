const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use("/images", express.static("upload/images"));

// Routes with DB connection
app.use("/api", async (req, res, next) => {
    await connectDB();
    next();
}, adminRoutes);

app.use("/", async (req, res, next) => {
    await connectDB();
    next();
}, userRoutes);

// Default Route
app.get("/", (req, res) => res.send("Express Running"));

// Start server for local development
if (require.main === module) {
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
}

// Export for Vercel
module.exports = app;
