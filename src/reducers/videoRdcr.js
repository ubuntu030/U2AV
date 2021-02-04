import {
	FETCH_VIDEO_PADDING,
	FETCH_VIDEO_SUCCESS,
	FETCH_VIDEO_ERROR,
	DOWNLOAD_VIDEO_PADDING,
	DOWNLOAD_VIDEO_SUCCESS,
	DOWNLOAD_VIDEO_ERROR,
	CONVERT_VIDEO_PADDING,
	CONVERT_VIDEO_SUCCESS,
	CONVERT_VIDEO_ERROR
} from "../actions";

const initialState = {
	"search_history": [],
	// "download_list": [{ "author": { "id": "UCXteDRy5qB0IjA8WPusCJ7w", "name": "Mr.Children Official Channel", "user": "MrChildren", "channel_url": "https://www.youtube.com/channel/UCXteDRy5qB0IjA8WPusCJ7w", "external_channel_url": "https://www.youtube.com/channel/UCXteDRy5qB0IjA8WPusCJ7w", "user_url": "http://www.youtube.com/user/MrChildren", "thumbnails": [{ "url": "https://yt3.ggpht.com/ytc/AAUvwngFueCocShkk_5P96bmJwlJ8Lk52t0JlgUUOWk0zg=s48-c-k-c0x00ffffff-no-rj-mo", "width": 48, "height": 48 }, { "url": "https://yt3.ggpht.com/ytc/AAUvwngFueCocShkk_5P96bmJwlJ8Lk52t0JlgUUOWk0zg=s88-c-k-c0x00ffffff-no-rj-mo", "width": 88, "height": 88 }, { "url": "https://yt3.ggpht.com/ytc/AAUvwngFueCocShkk_5P96bmJwlJ8Lk52t0JlgUUOWk0zg=s176-c-k-c0x00ffffff-no-rj-mo", "width": 176, "height": 176 }], "verified": false, "subscriber_count": 1220000 }, "embed": { "iframeUrl": "https://www.youtube.com/embed/Far8LLATzx4", "flashUrl": "http://www.youtube.com/v/Far8LLATzx4?version=3&autohide=1", "width": 1280, "height": 720, "flashSecureUrl": "https://www.youtube.com/v/Far8LLATzx4?version=3&autohide=1" }, "title": "Mr.Children 「Documentary film」 from “MINE”", "id": "Far8LLATzx4", "downloadFilePath": "d:\\Code\\U2-AV\\src\\media\\video\\Mr.Children 「Documentary film」 from “MINE”.mp4" }],
	"download_list": [],
	"iframe_loading": false,
	"download_loading": false
}
// store updated but components https://stackoverflow.com/questions/58850699/useselector-not-updating-when-store-has-changed-in-reducer-reactjs-redux
const videoReducer = (state = initialState, action) => {
	switch (action.type) {
		// --- GET_INFO state below
		case FETCH_VIDEO_PADDING:
			return { ...state, iframe_loading: true };
		case FETCH_VIDEO_SUCCESS:
			var { author, embed, title, videoId: id } = action.payload.videoDetails;
			// 若為重複的搜尋項目則將該筆紀錄放在更新最近歷史紀錄
			var filtedResult = state.search_history.filter(item => item.id !== id);
			return { ...state, search_history: [...filtedResult, { author, embed, title, id }], iframe_loading: false };
		case FETCH_VIDEO_ERROR:
			return { ...state, iframe_loading: false };
		// --- DOWNLOAD state below
		case DOWNLOAD_VIDEO_PADDING:
			return { ...state, download_loading: true };
		case DOWNLOAD_VIDEO_SUCCESS:
			var { author, embed, title, videoId: id } = action.payload.videoDetails;
			var { downloadFilePath } = action.payload;
			var filtedResult = state.download_list.filter(item => item.id === id);
			// 存在該筆資料則不再更新state
			if (filtedResult.length > 0) {
				return { ...state, download_loading: false };
			}
			return { ...state, download_list: [...state.download_list, { author, embed, title, id, downloadFilePath }], download_loading: false };
		case DOWNLOAD_VIDEO_ERROR:
			return { ...state, download_loading: false };
		// --- CONVERT state below
		case CONVERT_VIDEO_PADDING:
			var id = action.payload;
			var newDownloadList = state.download_list.map(item => {
				return (item.id === id) ? { ...item, converting: true } : item;
			});
			console.log('[RDC cnvt padding]', { ...state, download_list: newDownloadList });
			return { ...state, download_list: newDownloadList };
		case CONVERT_VIDEO_SUCCESS:
			var { id, title, audioPath } = action.payload;
			var newDownloadList = state.download_list.map(item => {
				return (item.id === id) ? { ...item, converting: false, audioPath } : item;
			});
			console.log('[RDC cnvt success]', { ...state, download_list: newDownloadList });
			return { ...state, download_list: newDownloadList };
		case CONVERT_VIDEO_ERROR:
			var { id, message } = action.payload;
			var newDownloadList = state.download_list.map(item => {
				return (item.id === id) ? { ...item, converting: false } : item;
			});
			console.log('[RDC cnvt error]', action.payload);
			return { ...state, download_list: newDownloadList };
		default:
			return state;
	}
}

export default videoReducer;