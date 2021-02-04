const fs = require('fs').promises;
const path = require('path');
const router = require('express').Router();
const ffmpeg = require('fluent-ffmpeg');

// const PATH_VIDEO_FOLDER = path.join(__dirname, '../src/media/Video');
const PATH_AUDIO_FOLDER = path.join(__dirname, '../src/media/Audio');
const PATH_FFMEPG = path.join(__dirname, './ffmpeg/bin/ffmpeg');
ffmpeg.setFfmpegPath(PATH_FFMEPG);

router.get('/', async (req, res) => {
	try {
		const result = await fs.readdir(PATH_AUDIO_FOLDER);
		console.log('[audiosRoute] ok:', result);
		res.send(result);
	} catch (error) {
		console.error('[audiosRoute] err:', error);
		res.send(error);
	}
});

module.exports = router;
