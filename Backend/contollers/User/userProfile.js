const User = require('../../models/User/user');

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;
        const { name } = req.body;

        const updateData = { name };

        if (req.file) {
            updateData.profilePic = `http://localhost:3000/uploads/${req.file.filename}`;
        }

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-passwordHash');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id;
        const user = await User.findById(userId).select('-passwordHash');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
