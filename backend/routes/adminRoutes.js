const express = require("express");
const { upload, uploadImage, addCine, removeCine, getAllCines } = require("../controllers/adminController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Image Upload (Admin Only)
router.post("/upload", upload.single("cine"), uploadImage);

// Cine Operations
router.post("/addcine", addCine);
router.delete("/removecine", removeCine);
router.get("/allcine", getAllCines);

module.exports = router;
    