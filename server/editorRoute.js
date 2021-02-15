const path = require('path');
const router = require('express').Router();
const ffmpeg = require('fluent-ffmpeg');
const { route } = require('./downloadRoute');

const PATH_AUDIO_FOLDER = path.join(__dirname, '../src/media/Audio');
const PATH_FFMEPG = path.join(__dirname, './ffmpeg/bin/ffmpeg');
ffmpeg.setFfmpegPath(PATH_FFMEPG);

router.use(function (req, res, next) {
	const { title, bg, ed } = req.body;
	if (!title || typeof title !== 'string') {
		res.send({
			error: 'wrong title',
		});
		return;
	}
	if (ed === 0 || bg >= ed) {
		res.send({
			error: 'wrong time',
		});
		return;
	}
	next();
});

router.post('/', (req, res) => {
	const { orgTitle, title, bg, ed } = req.body;
	const filePath = path.join(PATH_AUDIO_FOLDER, orgTitle);
	const cnvtFilePath = path.join(PATH_AUDIO_FOLDER, title +'.wav');
	ffmpeg(filePath)
		.setStartTime(bg)
		.setDuration(ed - bg)
		.output(path.join(cnvtFilePath))
		.on('end', function (err) {
			if (!err) {
				console.log('conversion Done')
				res.send({
					title: title,
					audioPath: cnvtFilePath
				});
			} else {
				res.send({
					error: err
				});
			}
		})
		.on('error', function (error) {
			console.log('error: ', error)
			res.send({
				error: error.message
			});
		}).run();
});

module.exports = router;