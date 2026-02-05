const express = require('express');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getProjects);
router.post('/', auth, upload.single('video'), createProject);
router.put('/:id', auth, upload.single('video'), updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;