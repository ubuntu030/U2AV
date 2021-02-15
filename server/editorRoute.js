const path = require('path');
const router = require('express').Router();
const ffmpeg = require('fluent-ffmpeg');
const { route } = require('./downloadRoute');

const PATH_AUDIO_FOLDER = path.join(__dirname, '../src/media/Audio');
const PATH_FFMEPG = path.join(__dirname, './ffmpeg/bin/ffmpeg');
ffmpeg.setFfmpegPath(PATH_FFMEPG);

router.use(function (req, res, next) {
	const { title, bg, ed } = req.body;
	if (title && ed > bg) {
		next();
	} else {
		res.send({
			error: 'empty param',
		});
	}
});

router.post('/', (req, res) => {
	const { title, bg, ed } = req.body;
	const filePath = path.join(PATH_AUDIO_FOLDER, 'test.wav');
	const cnvtFilePath = path.join(PATH_AUDIO_FOLDER, title);
	ffmpeg(filePath)
		.setStartTime(bg)
		.setDuration(ed - bg)
		.output(path.join(cnvtFilePath))
		.on('end', function (err) {
			if (!err) {
				console.log('conversion Done')
				res.send({
					data: 'qoo'
				});
			}
		})
		.on('error', function (error) {
			console.log('error: ', error)
			res.status(500).end();
		}).run()
});

module.exports = router;