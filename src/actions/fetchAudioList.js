const fetchAudioList = async () => {
	try {
		const result = await (await fetch('http://localhost:3000/audios')).json();
		console.log('[audio list] ok:', result);
		return result;
	} catch (error) {
		console.error('[audio list] err:', error);
		throw new Error(error);
	}
}

export default fetchAudioList;