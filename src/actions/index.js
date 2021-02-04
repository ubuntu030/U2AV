/**
 * ACTION TYPE
 */
// video
export const FETCH_VIDEO_PADDING = 'FETCH_VIDEO_PADDING';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_ERROR = 'FETCH_VIDEO_ERROR';
export const DOWNLOAD_VIDEO_PADDING = 'DOWNLOAD_VIDEO_PADDING';
export const DOWNLOAD_VIDEO_SUCCESS = 'DOWNLOAD_VIDEO_SUCCESS';
export const DOWNLOAD_VIDEO_ERROR = 'DOWNLOAD_VIDEO_ERROR';
export const CONVERT_VIDEO_PADDING = 'CONVERT_VIDEO_PADDING';
export const CONVERT_VIDEO_SUCCESS = 'CONVERT_VIDEO_SUCCESS';
export const CONVERT_VIDEO_ERROR = 'CONVERT_VIDEO_ERROR';
// audio
export const FETCH_AUDIOS_PADDING = 'FETCH_AUDIO_PADDING';
export const FETCH_AUDIOS_SUCCESS = 'FETCH_AUDIO_SUCCESS';
export const FETCH_AUDIOS_ERROR = 'FETCH_AUDIO_ERROR';

/**
 * VIDEO ACTION
 */
// GET VIDEO INFO
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
// DOWNLOAD VIDEO
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
// CONVERT VIDEO
export const convertVideoPadding = (id) => {
	return {
		type: CONVERT_VIDEO_PADDING,
		payload: id
	}
}
export const convertVideoSuccess = (info) => {
	return {
		type: CONVERT_VIDEO_SUCCESS,
		payload: info
	}
}
export const convertVideoError = ({ id, error }) => {
	return {
		type: CONVERT_VIDEO_ERROR,
		payload: { id, error }
	}
}

export const fetchAudiosPadding = () => {
	return {
		type: FETCH_AUDIOS_PADDING
	}
}
export const fetchAudiosSuccess = (list) => {
	return {
		type: FETCH_AUDIOS_SUCCESS,
		payload: list
	}
}
export const fetchAudiosError = (error) => {
	return {
		type: FETCH_AUDIOS_ERROR,
		payload: error
	}
}