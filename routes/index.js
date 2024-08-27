var express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require('path');

// // Config multer to save imgs into uploads
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, path.join(__dirname, '../public/uploads'));
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, Date.now() + '-' + file.originalname);
// 	}
// });

// const upload = multer({ storage: storage });


// // Endpoint to upload image
// router.post('/upload', upload.single('fileToUpload'), (req, res) => {
// 	const file = req.file;
// 	if (!file) {
// 		console.error('No file uploaded');
// 		return res.status(400).json({ error: { message: 'No file uploaded' } });
// 	}
// 	console.log(`File uploaded: ${file.filename}`);
// 	res.status(200).json({
// 		uploaded: true,
// 		url: `/uploads/${file.filename}`
// 	});
// });

// //////// // SET STORAGE news
const storage_news = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../public/uploads/news'));
	},
	filename: (req, file, cb) => {
		var today = new Date();
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2);
		var dateString = year + '-' + month + '-' + day;
		cb(null, dateString + '_' + file.originalname);
	}
});



const upload_news = multer({ storage: storage_news });
router.post('/upload-news', upload_news.single('fileToUpload'), (req, res) => {
	const file = req.file;
	if (!file) {
		console.error('No file uploaded');
		return res.status(400).json({ error: { message: 'No file uploaded' } });
	}else{
		return res.status(200).json({ error: { message: 'uploaded' } });
	}
	// console.log(`File uploaded: ${file.filename}`);
	// res.status(200).json({
	// 	uploaded: true,
	// 	url: `/uploads/${file.filename}`
	// });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
