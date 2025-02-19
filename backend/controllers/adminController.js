const Cine = require("../models/cineModel");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config();


const SCOPES = ["https://www.googleapis.com/auth/drive.file"];


const auth = new google.auth.GoogleAuth({
    credentials:{
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
        universe_domain: process.env.UNIVERSE_DOMAIN,
    },
    scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });


// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        cb(null, `${file.originalname.replace('.jpg',"")}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Upload Image
const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    try {
        const uploadDir = path.join(__dirname, "../upload/images");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
        const filePath = path.join(__dirname, "../upload/images", req.file.filename);
        console.log(filePath);
        
        const response = await drive.files.create({
            requestBody: {
                name: req.file.filename,
                parents: [process.env.FOLDER_ID], 
            },
            media: {
                mimeType: req.file.mimetype,
                body: fs.createReadStream(filePath),
            },
        });

        // Make file publicly accessible
        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });

        // Get public URL
        const imageUrl = `https://drive.google.com/uc?id=${response.data.id}`;

        // Delete the temporary file
        fs.unlinkSync(filePath);

        res.json({ success: true, image_url: imageUrl });
    } catch (error) {
        console.error("Google Drive Upload Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
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
