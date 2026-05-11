const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'devex_uploads', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    public_id: (req, file) => file.fieldname + '-' + Date.now(),
  },
});

// Init Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB max
});

module.exports = upload;
