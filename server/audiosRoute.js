const fs = require('fs').promises;
const util = require('util');
const path = require('path');
const router = require('express').Router();
const ffmpeg = require('fluent-ffmpeg');
const ffprobePms = util.promisify(ffmpeg.ffprobe);

// const PATH_VIDEO_FOLDER = path.join(__dirname, '../src/media/Video');
const PATH_AUDIO_FOLDER = path.join(__dirname, '../src/media/Audio');
const PATH_FFMEPG = path.join(__dirname, './ffmpeg/bin/ffmpeg');
ffmpeg.setFfmpegPath(PATH_FFMEPG);

router.get('/', async (req, res) => {
	try {
		const result = await fs.readdir(PATH_AUDIO_FOLDER);
		console.log('[audiosRoute] ok:', result);
		const listWithMeta = await Promise.all(result.map(async title => {
			return { title, meta: await ffprobePms(path.join(PATH_AUDIO_FOLDER, title)) };
		}))

		res.send(listWithMeta);
	} catch (error) {
		console.error('[audiosRoute] err:', error);
		res.send(error);
	}
});

module.exports = router;
