const User = require('../models/User/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/GenerateToken');

const registerUser = async ({ name, email, password, role }) => {
    const existing = await User.findOne({ email });
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash, role });
    return { token: generateToken(user), user, role: user.role };
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    if (!user.passwordHash) throw new Error('Please sign in with Google');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials');

    return { token: generateToken(user), user, role: user.role };
};

module.exports = { registerUser, loginUser };