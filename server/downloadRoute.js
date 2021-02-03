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
		const PATH_VIDEO = path.join(PATH_VIDEO_FOLDER, title + '.mp4');
		stream.pipe(fs.createWriteStream(PATH_VIDEO));
		stream.on('finish', () => {
			console.log('[downloadRoute] ok');
			videoInfo.downloadFilePath = PATH_VIDEO;
			res.send(videoInfo);
		});
	} catch (error) {
		console.log('[downloadRoute] err', error);
		res.send(error)
	}

});

module.exports = router;