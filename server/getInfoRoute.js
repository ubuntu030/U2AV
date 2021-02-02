// const path = require('path');
// const fs = require('fs').promises;
const ytdl = require('ytdl-core');
const router = require('express').Router();

router.post('/', async (req, res) => {
	try {
		const result = await ytdl.getInfo(req.body.url);
		console.log('[getInfoRoute] ok:', result);
		res.send(result);
	} catch (error) {
		console.log('[getInfoRoute] err:', error);
		res.send(error);
	}
});

module.exports = router;