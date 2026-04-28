const Message = require('../../models/Chat/message');
const User = require('../../models/User/user');

// Get chat history with a specific user
exports.getChatHistory = async (req, res) => {
    try {
        const { otherUserId } = req.params;
        const currentUserId = req.user.id || req.user._id;

        // Mark incoming messages as read
        await Message.updateMany(
            { senderId: otherUserId, receiverId: currentUserId, isRead: false },
            { isRead: true }
        );

        const messages = await Message.find({
            $or: [
                { senderId: currentUserId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: currentUserId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get list of users the current user has chatted with
exports.getChatContacts = async (req, res) => {
    try {
        const currentUserId = req.user.id || req.user._id;

        // Find all messages involving the user
        const messages = await Message.find({
            $or: [{ senderId: currentUserId }, { receiverId: currentUserId }]
        });

        // Extract unique user IDs
        const contactIds = new Set();
        messages.forEach(msg => {
            if (msg.senderId.toString() !== currentUserId.toString()) {
                contactIds.add(msg.senderId.toString());
            }
            if (msg.receiverId.toString() !== currentUserId.toString()) {
                contactIds.add(msg.receiverId.toString());
            }
        });

        // Fetch user details for those contacts
        const contacts = await User.find({ _id: { $in: Array.from(contactIds) } }).select('name username role profilePic');
        
        // Map contacts to include real unreadCount
        const enrichedContacts = await Promise.all(contacts.map(async (c) => {
            const unreadCount = await Message.countDocuments({
                senderId: c._id,
                receiverId: currentUserId,
                isRead: false
            });
            return {
                _id: c._id,
                name: c.name,
                username: c.username,
                role: c.role,
                profilePic: c.profilePic,
                unreadCount
            };
        }));
        
        res.status(200).json(enrichedContacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get total unread message count
exports.getUnreadCount = async (req, res) => {
    try {
        const currentUserId = req.user.id || req.user._id;
        const count = await Message.countDocuments({
            receiverId: currentUserId,
            isRead: false
        });
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Send a new message (HTTP REST Fallback)
exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, text, listingId } = req.body;
        const senderId = req.user.id || req.user._id;

        const message = await Message.create({
            senderId,
            receiverId,
            text,
            listingId
        });

        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
