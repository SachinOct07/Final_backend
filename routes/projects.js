const express = require('express');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { uploadVideo } = require('../middleware/cloudinaryUpload');

const router = express.Router();

router.get('/', getProjects);
router.post('/', auth, uploadVideo.single('video'), createProject);
router.put('/:id', auth, uploadVideo.single('video'), updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;