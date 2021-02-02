/**
 * ACTION TYPE
 */
export const FETCH_VIDEO_PADDING = 'FETCH_VIDEO_PADDING';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_ERROR = 'FETCH_VIDEO_ERROR';

/**
 * VIDEO ACTION
 */
export const fetchVideoPadding = () => {
	return {
		type: FETCH_VIDEO_PADDING
	}
}

export const fetchVideoSuccess = info => {
	return {
		type: FETCH_VIDEO_SUCCESS,
		payload: info
	}
}

export const fetchVideoError = error => {
	return {
		type: FETCH_VIDEO_ERROR,
		payload: error
	}
}