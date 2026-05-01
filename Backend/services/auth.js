const User = require('../models/User/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/GenerateToken');
const sendEmail = require('../utils/sendEmail');

const registerUser = async ({ name, email, password, role }) => {
    const existing = await User.findOne({ email });
    
    // Generate new OTP and expiration
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    if (existing) {
        // If the user already registered but never verified the email, let's just resend a new OTP.
        if (existing.isVerified) {
            throw new Error('Email already registered');
        } else {
            existing.otp = otp;
            existing.otpExpiresAt = otpExpiresAt;
            existing.passwordHash = await bcrypt.hash(password, 12);
            existing.name = name;
            existing.role = role;
            await existing.save();

            await sendEmail(email, 'Your DevEx Verification Code', `Your new verification code is: ${otp}\nIt expires in 5 minutes.`);
            return { success: true, message: "OTP sent to email", email: existing.email };
        }
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({ 
        name, 
        email, 
        passwordHash, 
        role, 
        otp, 
        otpExpiresAt, 
        isVerified: false 
    });

    await sendEmail(email, 'Your DevEx Verification Code', `Your verification code is: ${otp}\nIt expires in 5 minutes.`);

    return { success: true, message: "OTP sent to email", email: user.email };
};

const verifySignup = async ({ email, otp }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    if (user.isVerified) throw new Error('User is already verified');
    if (user.otp !== otp) throw new Error('Invalid OTP');
    if (user.otpExpiresAt < new Date()) throw new Error('OTP has expired. Please sign up again to request a new one.');

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return { token: generateToken(user), user, role: user.role };
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    if (!user.isVerified) throw new Error('Please verify your email before logging in');
    if (!user.passwordHash) throw new Error('Please sign in with Google');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials');

    return { token: generateToken(user), user, role: user.role };
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('No account found with this email');

    // Generate recovery OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    await sendEmail(email, 'DevEx Password Reset Code', `Your password reset code is: ${otp}\nIt expires in 5 minutes.`);
    return { success: true, message: 'Recovery code sent to email' };
};

const resetPassword = async ({ email, otp, newPassword }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    if (user.otp !== otp) throw new Error('Invalid OTP');
    if (user.otpExpiresAt < new Date()) throw new Error('OTP has expired');

    // Update password
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    
    // Once they reset password, we can also mark them as verified if they weren't
    user.isVerified = true; 
    
    // Clear OTP
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return { success: true, message: 'Password has been reset successfully' };
};

module.exports = { registerUser, verifySignup, loginUser, forgotPassword, resetPassword };