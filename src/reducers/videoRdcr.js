import {
	FETCH_VIDEO_PADDING,
	FETCH_VIDEO_SUCCESS,
	FETCH_VIDEO_ERROR
} from "../actions";

const initialState = {
	"search_history": [{
		"id": "xxx",
		"name": "name",
		"embedUrl": "url"
	}],
	"download_list": [{
		"id": {
			"id": "xxx",
			"name": "name of video",
			"path": "vidoe path",
			"isConvert": "false"
		}
	}]
}

const videoReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_VIDEO_PADDING:
			return state;
		case 'FETCH_VIDEO_SUCCESS':
			return state;
		case 'FETCH_VIDEO_ERROR':
			return state;
		default:
			return state;
	}
}

export default videoReducer;