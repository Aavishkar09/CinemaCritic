const express = require("express");
const { upload, uploadImage, addCine, removeCine, getAllCines,getCineById,viewCine,getTrendingCines, updateCine } = require("../controllers/adminController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Image Upload (Admin Only)
router.post("/upload", upload.single("cine"), uploadImage);

// Cine Operations
router.post("/", addCine);
router.delete("/:id", removeCine);
router.get("/", getAllCines);
router.get("/trending", getTrendingCines);
router.get("/:id", getCineById);
router.post(`/view/:id`, viewCine);
router.post("/update-genres",updateCine) 


module.exports = router;
    