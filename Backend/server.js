const express = require("express");
const connectDB = require("../Backend/config/db");
const port = 3000;

app.use(express.json());
const app = express();
connectDB();  // Connecting to MongoDB


app.get("/", (req, res) => {
    res.send("Project Setup!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});