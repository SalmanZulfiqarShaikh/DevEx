const express = require("express");
const connectDB = require("./config/db");
const passport = require("./config/passport");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const listingRoutes  = require('./routes/listingRoutes');
const linkedList     = require('./utils/linkedList');
const Listing        = require('./models/Listing/listing');
const paymentRoutes  = require('./routes/paymentRoutes');
const { Server } = require("socket.io");
const http = require("http");
const Message = require("./models/Chat/message");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://devexpk.vercel.app', 'http://localhost:5173'],
    credentials: true
  }
});
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: ['https://devexpk.vercel.app', 'http://localhost:5173'], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use('/uploads', express.static(require('path').join(__dirname, 'public/uploads')));

// Connect DB
connectDB();

// Routes
app.use('/auth/signup', require('./routes/signup'));
app.use('/auth/login',  require('./routes/login'));
app.use('/auth/password', require('./routes/passwordRoutes'));
app.use('/auth',        require('./routes/oauth'));    // google oauth
app.use('/dashboard/buyer', require('./routes/buyer')); // buyer dashboard routes
app.use('/',            require('./routes/main'));     // logout
app.use('/listing', listingRoutes)
app.use('/admin', require('./routes/adminRoutes'));
app.use('/payments',  paymentRoutes);
app.use('/purchases', require('./routes/purchaseRoutes'));
app.use('/chat', require('./routes/chatRoutes'));
app.use('/favorites', require('./routes/favoritesRoutes'));
app.use('/profile', require('./routes/userProfileRoutes'));

async function rebuildLinkedList() {
  const listings = await Listing.find().sort({ createdAt: 1 }); // oldest first
  listings.forEach(l => linkedList.prepend(l)); // newest ends up at head
  console.log(`Linked List rebuilt with ${listings.length} listings`);
}
rebuildLinkedList();

app.get("/", (req, res) => {
    res.send("welcm to devex bois!!!!!!! eosdoashiodasdod!");
});

// Socket.io Implementation
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a room based on user ID to receive messages
    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their personal room`);
    });

    // Handle sending message
    socket.on('sendMessage', async (data) => {
        try {
            const { senderId, receiverId, text } = data;
            const message = { senderId, receiverId, text, createdAt: new Date() };

            // Emit to receiver's room
            io.to(receiverId).emit('receiveMessage', message);
        } catch (error) {
            console.error("Socket send message error:", error);
            socket.emit('error', { message: 'Failed to send message' });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});