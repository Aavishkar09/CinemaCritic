const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();
app.use(cors());
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Static Files
app.use("/images", express.static("upload/images"));

// Routes
app.use("/api", adminRoutes);
app.use("/", userRoutes);

// Default Route
app.get("/", (req, res) => res.send("Express Running"));

// Start Server
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
