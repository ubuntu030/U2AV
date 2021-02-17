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

	const handleItemDel = async (title) => {
		try {
			const result = await (await fetch('http://localhost:3000/delAudio', {
				method: 'POST',
				body: JSON.stringify({ title: title }),
				headers: {
					'content-type': 'application/json'
				}
			})).json();
			dispatch(fetchAudiosPadding());
			try {
				const result = await fetchAudioList();
				dispatch(fetchAudiosSuccess(result));
			} catch (error) {
				dispatch(fetchAudiosError());
			}
			console.log('[delAudio] ok:', result);
		} catch (error) {
			console.log('[delAudio] err:', error);
		}
	}

	let title = '';
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
						audio_list.map(item => {
							title = item.title;
							return (
							<li key={title} className={item.selected ? "selected" : ""}>
								<div onClick={() => { handleItemClick(item) }}>
									{title}
								</div>
								<img onClick={()=> {handleItemDel(item.title)}} className="del-btn" src="src/public/icons/delete.png" alt="" />
							</li>
							)
						})
					}
				</ul>
				{list_loading ? <div className="loader"></div> : null}
			</section>
		</main>
	)
}

export default AudioSection