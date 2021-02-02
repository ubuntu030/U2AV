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
		case 'ADD_HISTORY_ITEM':
			return state;
		case 'DOWNLOAD_LIST':
			return state;
		default:
			return state;
	}
}

export default videoReducer;