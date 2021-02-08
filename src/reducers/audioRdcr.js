import {
	FETCH_AUDIOS_PADDING,
	FETCH_AUDIOS_SUCCESS,
	FETCH_AUDIOS_ERROR,
	SELECTED_AUDIO
} from '../actions';

const initialState = {
	audio_list: [],
	list_loading: false
};

const audioReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_AUDIOS_PADDING:
			return { ...state, list_loading: true };
		case FETCH_AUDIOS_SUCCESS:
			return { ...state, audio_list: [...action.payload], list_loading: false };
		case FETCH_AUDIOS_ERROR:
			return { ...state, list_loading: false };
		case SELECTED_AUDIO:
			var list = state.audio_list.map(item => {
				return { ...item, selected: (item.title === action.payload) ? true : false }
			})
			return { ...state, audio_list: [...list] };
		default:
			return state;
	}
}

export default audioReducer;