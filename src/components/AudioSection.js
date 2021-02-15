import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAudiosPadding, fetchAudiosSuccess, fetchAudiosError, selectedAudio } from "../actions";
import fetchAudioList from "../actions/fetchAudioList";

import MediaPlayer from "./MediaPlayer";
import AudioEditor from "./AudioEditor";

function AudioSection() {
	const [musicInfo, setMusicInfo] = useState({ title: '', meta: null });
	const { audio_list, list_loading } = useSelector(state => state.audioReducer);
	const dispatch = useDispatch();
	// fetch Audio list when component did mount 
	useEffect(async () => {
		dispatch(fetchAudiosPadding());
		try {
			const result = await fetchAudioList();
			dispatch(fetchAudiosSuccess(result));
		} catch (error) {
			dispatch(fetchAudiosError());
		}
	}, []);

	const handleItemClick = ({ title, meta }) => {
		setMusicInfo({ title, meta });
		dispatch(selectedAudio(title));
	}

	return (
		<main className="audio-container">
			<section className="audio-player">
				<MediaPlayer list={audio_list} play={musicInfo} />
			</section>
			<section className="audio-editor">
				<AudioEditor info={musicInfo} />
			</section>
			<section className="audio-list">
				<div className="section-decs">Audio List</div>
				<ul>
					{
						audio_list.map(item => (
							<li key={item.title} className={item.selected ? "selected" : ""} onClick={() => { handleItemClick(item) }}>
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