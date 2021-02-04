import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAudiosPadding, fetchAudiosSuccess, fetchAudiosError } from "../actions";

function AudioSection() {
	const { audio_list } = useSelector(state => state.audioReducer);
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

	return (
		<main className="audio-container">
			<section className="audio-player">
				audio-player
			</section>
			<section className="audio-editor">
				audio-editor
			</section>
			<section className="audio-list">
				<div className="section-decs">Audio List</div>
				<ul>
					{
						audio_list.map(title => (
							<li key={title}>
								{title}
							</li>
						))
					}
				</ul>
			</section>
		</main>
	)
}

export default AudioSection