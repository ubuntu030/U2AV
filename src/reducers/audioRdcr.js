import { FETCH_AUDIOS_PADDING, FETCH_AUDIOS_SUCCESS, FETCH_AUDIOS_ERROR } from '../actions';

const initialState = {
	audio_list: []
};

const audioReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_AUDIOS_PADDING:
			return state;
		case FETCH_AUDIOS_SUCCESS:
			return { ...state, audio_list: [...action.payload] };
		case FETCH_AUDIOS_ERROR:
			return state;
		default:
			return state;
	}
}

export default audioReducer;