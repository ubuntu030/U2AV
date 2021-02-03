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
		case FETCH_VIDEO_PADDING:
			return { ...state, iframe_loading: true };
		case FETCH_VIDEO_SUCCESS:
			var { author, embed, title, videoId: id } = action.payload.videoDetails;
			let search_history_list = [...state.search_history, { author, embed, title, id }]
			let newState = Object.assign(state, { search_history: search_history_list });
			// TODO: prevent write same data in list
			return { ...newState, iframe_loading: false };
		case FETCH_VIDEO_ERROR:
			return { ...state, iframe_loading: false };
		case DOWNLOAD_VIDEO_PADDING:
			return { ...state, download_loading: true };
		case DOWNLOAD_VIDEO_SUCCESS:
			var { author, embed, title, videoId: id } = action.payload.videoDetails;
			// TODO: prevent write same data in list
			newState = { ...state, download_list: [...state.download_list, { author, embed, title, id }], download_loading: false }
			return newState;
		case DOWNLOAD_VIDEO_ERROR:
			return { ...state, download_loading: false };;
		default:
			return state;
	}
}

export default videoReducer;