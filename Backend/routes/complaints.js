const express = require('express');
const multer = require('multer');
const { createComplaint, getAllComplaints } = require('../controllers/complaintController');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('image'), createComplaint);
router.get('/', auth, adminAuth, getAllComplaints);

module.exports = router;
