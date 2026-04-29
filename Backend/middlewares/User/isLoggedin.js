const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const isSeller = (req, res, next) => {
    if (req.user?.role !== 'seller') 
        return res.status(403).json({ message: 'Sellers only' });
    next();
};

const isBuyer = (req, res, next) => {
    if (req.user?.role !== 'buyer') 
        return res.status(403).json({ message: 'Buyers only' });
    next();
};
const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') 
        return res.status(403).json({ message: 'Admins only' });
    next();
};

module.exports = { isLoggedIn, isSeller, isBuyer, isAdmin };