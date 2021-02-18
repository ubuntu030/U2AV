const path = require('path');
const { exec } = require('child_process');
const router = require('express').Router();

const PATH_AUDIO_FOLDER = path.join(__dirname, '../src/media/Audio');
const PATH_VIDEO_FOLDER = path.join(__dirname, '../src/media/Video');

router.post('/', (req, res) => {
    const {type} = req.body;
    const whichFolder = (type === 'audio') ? PATH_AUDIO_FOLDER : PATH_VIDEO_FOLDER;
    try {
        exec(`start "" ${whichFolder}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`[]exec error: ${error}`);
            console.error(`[openFolder] err:,${error}`);
            res.send({error: error});
            return;
          }
          console.log(`[openFolder] ok:,${whichFolder}`);
          res.send({
              state:'ok'
          });
        });
        
    } catch (error) {
        res.end();
    }
});

module.exports = router;

