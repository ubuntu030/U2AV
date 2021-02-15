const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();

const PORT = 3000;

const downloadRoute = require('./downloadRoute');
const getInfoRoute = require('./getInfoRoute');
const getMetaDataRoute = require('./getMetaDataRoute');
const convertRoute = require('./convertRoute');
const audiosRoute = require('./audiosRoute');
const editorRoute = require('./editorRoute');
// 處理跨域請求
app.use(cors());
app.use(express.json());
// 取得影片資訊
app.use('/getInfo', getInfoRoute);
// 下載影片
app.use('/download', downloadRoute);
// META data of media
app.use('/getMeta', getMetaDataRoute);
// 影像轉音頻
app.use('/convert', convertRoute);
// 音訊清單
app.use('/audios', audiosRoute);
// 音訊編輯
app.use('/edit', editorRoute);

app.get('/', (req, res) => {
	res.end();
});

app.listen(PORT, () => {
	console.log(`server listening at http://localhost:${PORT}`)
});