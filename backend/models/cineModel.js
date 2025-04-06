const mongoose = require("mongoose");

const cineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    posterImage: {type: String, required: true},
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    year: { type: Number, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    section: { type: String, required: true },
    views: { type: Number, default: 0 } ,
    genres : {type: [String], required: true},
    budget: {type: Number, required: true},
    revenue: {type: Number,required:true},
}, { timestamps: true });

const Cine = mongoose.model("Cine", cineSchema);
module.exports = Cine;
