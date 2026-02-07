const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('✅ Cloudinary configured:', process.env.CLOUDINARY_CLOUD_NAME ? 'Cloud name set' : '⚠️ Missing CLOUDINARY_CLOUD_NAME');

// Storage for images (products, schemes, slides)
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'sm-priya-electricals/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [{ width: 1200, height: 800, crop: 'limit' }],
    },
});

// Storage for videos (projects)
const videoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'sm-priya-electricals/videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'webm', 'mov', 'avi'],
    },
});

const uploadImage = multer({ storage: imageStorage });
const uploadVideo = multer({ storage: videoStorage });

module.exports = { uploadImage, uploadVideo, cloudinary };
