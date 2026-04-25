const express = require("express");
const connectDB = require("./config/db");
const passport = require("./config/passport");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Connect DB
connectDB();

// Routes
app.use('/auth/signup', require('./routes/signup'));
app.use('/auth/login',  require('./routes/login'));
app.use('/auth',        require('./routes/oauth'));    // google oauth
app.use('/',            require('./routes/main'));     // logout

app.get("/", (req, res) => {
    res.send("welcm to devex bois!!!!!!!!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});