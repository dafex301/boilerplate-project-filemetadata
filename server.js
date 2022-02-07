var express = require('express');
var cors = require('cors');
require('dotenv').config();

// use multer
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

// Multer middleware
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
	var file = req.file;
	var response = {
		name: file.originalname,
		type: file.mimetype,
		size: file.size,
	};
	res.json(response);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Your app is listening on port ' + port);
});
