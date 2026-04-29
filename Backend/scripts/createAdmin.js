const mongoose = require('mongoose');
const User = require('../models/User/user');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devex')
.then(async () => {
    const email = 'admin@devex.pk';
    const existing = await User.findOne({ email });
    if (existing) {
        existing.role = 'admin';
        await existing.save();
        console.log('Admin user updated:', email);
    } else {
        const passwordHash = await bcrypt.hash('admin123', 12);
        await User.create({
            name: 'DevEx Admin',
            email,
            passwordHash,
            role: 'admin'
        });
        console.log('Admin user created:', email);
    }
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
