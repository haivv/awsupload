var express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');

// Config multer to save imgs into uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../public/uploads'));
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage: storage });

// Endpoint to upload image
router.post('/upload', upload.single('fileToUpload'), (req, res) => {
	const file = req.file;
	if (!file) {
		console.error('No file uploaded');
		return res.status(400).json({ error: { message: 'No file uploaded' } });
	}
	console.log(`File uploaded: ${file.filename}`);
	res.status(200).json({
		uploaded: true,
		url: `/uploads/${file.filename}`
	});
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
