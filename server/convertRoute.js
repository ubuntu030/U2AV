const path = require('path');
const router = require('express').Router();
const ffmpeg = require('fluent-ffmpeg');

// const PATH_VIDEO_FOLDER = path.join(__dirname, '../src/media/Video');
const PATH_AUDIO_FOLDER = path.join(__dirname, '../src/media/Audio');
const PATH_FFMEPG = path.join(__dirname, './ffmpeg/bin/ffmpeg');
ffmpeg.setFfmpegPath(PATH_FFMEPG);

router.post('/', (req, res) => {
	const { id, title, videoPath } = req.body;
	const audioPath = path.join(PATH_AUDIO_FOLDER, title + '.wav');

	ffmpeg(videoPath)
		.output(audioPath)
		.audioBitrate('320k')
		.on('end', () => {
			res.send({
				id: id,
				title: title,
				audioPath: audioPath
			});
		})
		.on('error', error => {
			console.log('[converRoute] err', error);
			res.send({
				message: error,
				id: id
			});
		})
		.run();
});

module.exports = router;

