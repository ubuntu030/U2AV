import {
	FETCH_VIDEO_PADDING,
	FETCH_VIDEO_SUCCESS,
	FETCH_VIDEO_ERROR,
	DOWNLOAD_VIDEO_PADDING,
	DOWNLOAD_VIDEO_SUCCESS,
	DOWNLOAD_VIDEO_ERROR
} from "../actions";

const initialState = {
	"search_history": [],
	"download_list": [],
	"iframe_loading": false,
	"download_loading": false
}
// store updated but components https://stackoverflow.com/questions/58850699/useselector-not-updating-when-store-has-changed-in-reducer-reactjs-redux
const videoReducer = (state = initialState, action) => {
	switch (action.type) {
		// ---Process GET_INFO state below
		case FETCH_VIDEO_PADDING:
			return { ...state, iframe_loading: true };
		case FETCH_VIDEO_SUCCESS:
			var { author, embed, title, videoId: id } = action.payload.videoDetails;
			// 若為重複的搜尋項目則將該筆紀錄放在更新最近歷史紀錄
			var filtedResult = state.search_history.filter(item => item.id !== id);
			return { ...state, search_history: [...filtedResult, { author, embed, title, id }], iframe_loading: false };
		case FETCH_VIDEO_ERROR:
			return { ...state, iframe_loading: false };
		// ---Process DOWNLOAD state below
		case DOWNLOAD_VIDEO_PADDING:
			return { ...state, download_loading: true };
		case DOWNLOAD_VIDEO_SUCCESS:
			var { author, embed, title, videoId: id } = action.payload.videoDetails;
			var { downloadFilePath } = action.payload;
			var filtedResult = state.download_list.filter(item => item.id === id);
			if (filtedResult.length > 0) {
				return { ...state, download_loading: false };
			}
			return { ...state, download_list: [...state.download_list, { author, embed, title, id, downloadFilePath }], download_loading: false };
		case DOWNLOAD_VIDEO_ERROR:
			return { ...state, download_loading: false };;
		default:
			return state;
	}
}

export default videoReducer;