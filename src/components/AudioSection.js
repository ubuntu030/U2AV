import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAudiosPadding, fetchAudiosSuccess, fetchAudiosError } from "../actions";

import MediaPlayer from "./MediaPlayer";

function AudioSection() {
	const [musicInfo, setMusicInfo] = useState({ title: '', meta: null });
	const { audio_list, list_loading } = useSelector(state => state.audioReducer);
	const dispatch = useDispatch();
	// fetch Audio list when component did mount 
	useEffect(async () => {
		dispatch(fetchAudiosPadding());
		try {
			const result = await (await fetch('http://localhost:3000/audios')).json();
			console.log('[audio list] ok:', result);
			dispatch(fetchAudiosSuccess(result));
		} catch (error) {
			console.error('[audio list] err:', error);
			dispatch(fetchAudiosError());
		}
	}, []);

	const handleItemClick = ({ title, meta }) => {
		setMusicInfo({ title, meta });
	}

	return (
		<main className="audio-container">
			<section className="audio-player">
				<MediaPlayer play={musicInfo} />
			</section>
			<section className="audio-editor">
				audio-editor
			</section>
			<section className="audio-list">
				<div className="section-decs">Audio List</div>
				<ul>
					{
						audio_list.map(item => (
							<li key={item.title} onClick={() => { handleItemClick(item) }}>
								{item.title}
							</li>
						))
					}
				</ul>
				{list_loading ? <div className="loader"></div> : null}
			</section>
		</main>
	)
}

export default AudioSection