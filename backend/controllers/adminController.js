const Cine = require("../models/cineModel");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");
const { file } = require("googleapis/build/src/apis/file");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = multer.memoryStorage();

const upload = multer({ storage });

// Upload Image
const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded!" });
      }
    
      // Convert the file buffer to a stream and upload it to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "MovieImages" }, // Replace with your Cloudinary folder name
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            return res.status(500).json({ message: "Image upload failed!", error });
          }
    
          res.status(200).json({
            message: "Image uploaded successfully!",
            imageUrl: result.secure_url,
          });
        }
      );
    
      // Stream the file buffer to Cloudinary
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
};

// Add Cine
const addCine = async (req, res) => {
    try {
        const cine = await Cine.create(req.body);
        res.status(201).json({ success: true, cine });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Remove Cine
const removeCine = async (req, res) => {
    try {
        await Cine.findByIdAndDelete(req.body._id);
        res.json({ success: true, message: "Cine Removed" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get All Cines
const getAllCines = async (req, res) => {
    const cines = await Cine.find();
    res.json(cines);
};

const updateCine = async (req,res) => {
    
}

module.exports = { upload, uploadImage, addCine, removeCine, getAllCines };
