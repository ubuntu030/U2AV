/**
 * ACTION TYPE
 */
export const FETCH_VIDEO_PADDING = 'FETCH_VIDEO_PADDING';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_ERROR = 'FETCH_VIDEO_ERROR';
export const DOWNLOAD_VIDEO_PADDING = 'DOWNLOAD_VIDEO_PADDING';
export const DOWNLOAD_VIDEO_SUCCESS = 'DOWNLOAD_VIDEO_SUCCESS';
export const DOWNLOAD_VIDEO_ERROR = 'DOWNLOAD_VIDEO_ERROR';

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

export const downloadVideoPadding = () => {
	return {
		type: DOWNLOAD_VIDEO_PADDING,
	}
}
export const downloadVideoSuccess = info => {
	return {
		type: DOWNLOAD_VIDEO_SUCCESS,
		payload: info
	}
}
export const downloadVideoError = error => {
	return {
		type: DOWNLOAD_VIDEO_ERROR,
		payload: error
	}
}