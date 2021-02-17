const fs = require('fs').promises;
const path = require('path');
const router = require('express').Router();

const PATH_AUDIO_FOLDER = path.join(__dirname, '../src/media/Audio');

router.post('/', async (req, res) => {
    const {title} = req.body;
    const filePath = path.join(PATH_AUDIO_FOLDER,title);
	try {
		const result = await fs.unlink(filePath);
		console.log('[Del audio] ok:', result);

		res.send({
            state: 'ok'
        });
	} catch (error) {
		console.error('[Del audio] err:', error);
		res.send(error);
	}
});

module.exports = router;
