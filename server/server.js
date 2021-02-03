const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();

const PORT = 3000;

const downloadRoute = require('./downloadRoute');
const getInfoRoute = require('./getInfoRoute');
const getMetaDataRoute = require('./getMetaDataRoute');
// 處理跨域請求
app.use(cors());
app.use(express.json());
// 取得影片資訊
app.use('/getInfo', getInfoRoute);
// 下載影片
app.use('/download', downloadRoute);
// META data of media
app.use('/getMeta', getMetaDataRoute);

app.get('/', (req, res) => {
	res.end();
});

app.listen(PORT, () => {
	console.log(`server listening at http://localhost:${PORT}`)
});