const Cine = require("../models/cineModel");
const multer = require("multer");
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


const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded!" });
      }
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "MovieImages" },
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
    

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
};


const addCine = async (req, res) => {
    try {
        const cine = await Cine.create(req.body);
        res.status(201).json({ success: true, cine });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const removeCine = async (req, res) => {
    try {
        await Cine.findByIdAndDelete(req.body._id);
        res.json({ success: true, message: "Cine Removed" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const getAllCines = async (req, res) => {
  try {
      const searchQuery = req.query.query;
      let filter = {};
      if (searchQuery) {
          filter = { name: { $regex: searchQuery, $options: "i" } };
      }
      const cines = await Cine.find(filter);
      res.json(cines);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch movies" });
  }
};


const getCineById = async (req, res) => {
  try {
      const { id } = req.params;
      const cine = await Cine.findById(id);
      if (!cine) {
          return res.status(404).json({ success: false, message: "Cine not found!" });
      }
      res.status(200).json({ success: true, cine });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};


const viewCine = async (req, res) => {
  try {
      const { id } = req.params;
      const cine = await Cine.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

      if (!cine) {
          return res.status(404).json({ success: false, message: "Cine not found!" });
      }

      res.status(200).json({ success: true, cine });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};


const getTrendingCines = async (req, res) => {
  try {
      const trendingCines = await Cine.find()
          .sort({ views: -1 })
          .limit(10);

      res.json(trendingCines);
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};


const updateCine = async (req,res) => {
    try{
        const { genres } = req.body;
        const result = await Cine.updateMany({}, { $set: { genres } });
        res.json({ message: "Genres updated successfully", modifiedCount: result.modifiedCount });
    }catch (error) {
        res.status(500).json({ message: "Error updating genres", error: error.message });
    }
}

module.exports = { upload, uploadImage, addCine, removeCine, getAllCines,getCineById,viewCine,getTrendingCines,updateCine};
