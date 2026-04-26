const express = require("express");
const connectDB = require("./config/db");
const passport = require("./config/passport");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const listingRoutes  = require('./routes/listingRoutes');
const linkedList     = require('./utils/linkedList');
const Listing        = require('./models/Listing/listing');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: ['https://devexpk.vercel.app', 'http://localhost:5173'], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Connect DB
connectDB();

// Routes
app.use('/auth/signup', require('./routes/signup'));
app.use('/auth/login',  require('./routes/login'));
app.use('/auth',        require('./routes/oauth'));    // google oauth
app.use('/dashboard/buyer', require('./routes/buyer')); // buyer dashboard routes
app.use('/',            require('./routes/main'));     // logout
app.use('/listing', listingRoutes)

async function rebuildLinkedList() {
  const listings = await Listing.find().sort({ createdAt: 1 }); // oldest first
  listings.forEach(l => linkedList.prepend(l)); // newest ends up at head
  console.log(`Linked List rebuilt with ${listings.length} listings`);
}
rebuildLinkedList();

app.get("/", (req, res) => {
    res.send("welcm to devex bois!!!!!!!!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});