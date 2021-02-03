const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');
const router = require('express').Router();

const PATH_VIDEO_FOLDER = path.join(__dirname, '../src/media/video');

router.post('/', async (req, res) => {
	try {
		// get info first 
		const videoInfo = await ytdl.getInfo(req.body.url);
		const { title = 'video.mp4' } = videoInfo.videoDetails;
		// call download api
		const stream = await ytdl.downloadFromInfo(videoInfo, { filter: 'audioandvideo', quality: 'highestvideo' })
		stream.pipe(fs.createWriteStream(path.join(PATH_VIDEO_FOLDER, title + '.mp4')));
		stream.on('finish', () => {
			console.log('[downloadRoute] ok');
			res.send({ status: 'ok' });
		});
	} catch (error) {
		console.log('[downloadRoute] err', error);
		res.send(error)
	}

});

module.exports = router;