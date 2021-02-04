import { FETCH_AUDIOS_PADDING, FETCH_AUDIOS_SUCCESS, FETCH_AUDIOS_ERROR } from '../actions';

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
		default:
			return state;
	}
}

export default audioReducer;