const path = require('path');
const router = require('express').Router();
const ffmpeg = require('fluent-ffmpeg');
const util = require('util');
const ffprobePms = util.promisify(ffmpeg.ffprobe);

// 設定 ffmpeg路徑
const PATH_FFMEPG = path.join(__dirname, './ffmpeg/bin/ffmpeg');
ffmpeg.setFfmpegPath(PATH_FFMEPG);

router.post('/', async (req, res) => {
	const { filePath } = req.body;

	try {
		const result = await ffprobePms(filePath);
		console.log('[getMetaDataRoute] ok', result);
		res.send(result);
	} catch (error) {
		console.log('[getMetaDataRoute] err', error);
		res.status(500).end(error);
	}
});

module.exports = router;