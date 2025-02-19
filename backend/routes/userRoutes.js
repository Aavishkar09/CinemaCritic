const express = require("express");
const router = express.Router();
const { signup, signin, addWatchlist, removeWatchlist, getWatchlist } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { getAllCines } = require("../controllers/adminController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/addwatchlist", authMiddleware, addWatchlist);
router.post("/removewatchlist", authMiddleware, removeWatchlist);
router.get("/watchlist", authMiddleware, getWatchlist);
router.get("/allcine", getAllCines);

module.exports = router;
