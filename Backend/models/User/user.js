const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:         { type: String, required: true },
    email:        { type: String, required: true, unique: true },
    passwordHash: { type: String },       
    googleId:     { type: String },       // for Google OAuth
    role:         { type: String, enum: ['buyer', 'seller'], required: true },
    profilePic:   { type: String, default: "" },
    createdAt:    { type: Date, default: Date.now },
    updatedAt:    { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);