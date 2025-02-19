const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "Email already exists" });
        }

        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            watchlistData: {}
        });

        await user.save();
        const token = jwt.sign({ user: { id: user.id } }, "secret_tk");
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ error: "Error signing up" });
    }
};

// Signin
exports.signin = async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (!user || user.password !== req.body.password) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const token = jwt.sign({ user: { id: user.id } }, "secret_tk");
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ error: "Error signing in" });
    }
};

// Add to Watchlist
exports.addWatchlist = async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.watchlistData[req.body.itemId] = (userData.watchlistData[req.body.itemId] || 0) + 1;
    await userData.save();
    res.send("Added to watchlist");
};

// Remove from Watchlist
exports.removeWatchlist = async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.watchlistData[req.body.itemId] > 0) {
        userData.watchlistData[req.body.itemId] -= 1;
        await userData.save();
    }
    res.send("Removed from watchlist");
};

// Get Watchlist
exports.getWatchlist = async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.watchlistData);
};