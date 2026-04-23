const express = require("express");
const connectDB = require("./config/db");
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
connectDB();  // Connecting to MongoDB


app.get("/", (req, res) => {
    res.send("Project Setup!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});