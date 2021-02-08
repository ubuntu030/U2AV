// https://stackoverflow.com/questions/39325637/audio-auto-play-next-song-when-previous-is-finished/39330684
// https://dev.to/jamland/audio-player-with-wavesurfer-js-react-1g3b
import React, { useEffect, useRef, useState } from "react";

import "./MediaPlayer.scss";

const MediaPlayer = ({ play = {} }) => {
	// const wavesurferRef = useRef(null);
	const audioRef = useRef(null);
	const [isPlay, setIsPlay] = useState(false);
	const [totalT, setTotalT] = useState('00:00');
	const [crntT, setCrntT] = useState('00:00');
	const { title, meta } = play;

	const togglePlay = () => {
		const aud = audioRef.current;
		if (aud.paused && aud.readyState === 4) {
			aud.play();
			setIsPlay(true)
		} else {
			aud.pause();
			setIsPlay(false)
		}
	}
	const handleStop = () => {
		const aud = audioRef.current;
		aud.pause();
		aud.currentTime = 0;
		setIsPlay(false)
	}
	const handleVolChange = (e) => {
		const { value } = e.target;
		const aud = audioRef.current;
		aud.volume = value;
	}

	useEffect(() => {
		const aud = audioRef.current;
		setIsPlay(false);
		aud.src = "src/media/Audio/" + play.title;
		aud.load();
		aud.onloadeddata = () => {
			setTotalT(timeFormat(aud.duration));
			setCrntT(timeFormat(aud.currentTime));
			console.log('loaded');
		}
		aud.ontimeupdate = () => {
			setCrntT(timeFormat(aud.currentTime));
		}
	}, [play]);

	let ext = '';
	let bps = '';
	if (meta && meta.format) {
		ext = meta.format.format_name.toUpperCase();
		bps = meta.format.bit_rate + " bps";
	}
	return (
		<main className="media-player">
			<section className="wavesurfer-container">
				<audio ref={audioRef} src="src/media/Audio/Mr.Children 「Brand new planet」 from “MINE”.wav"></audio>
				<progress value={crntT.rndSec} max={totalT.rndSec}></progress>
			</section>
			<section className="run-time">
				<div className="now">
					<p>{crntT.frmtTime}</p>
				</div>
				<div className="total">
					<p>{totalT.frmtTime}</p>
				</div>
			</section>
			<section className="media-detail">
				<div className="title">
					{title}
				</div>
				<div className="meta">
					{
						ext + " " + bps
					}
				</div>
			</section>
			<section className="control-bar">
				<div>
					{
						isPlay ?
							<img className="play" src="src/public/icons/icons8-pause-48.png" onClick={() => { togglePlay() }} alt="" /> :
							<img className="play" src="src/public/icons/icons8-play-48.png" onClick={() => { togglePlay() }} alt="" />
					}
				</div>
				<div>
					<img className="stop" src="src/public/icons/icons8-stop-48.png" onClick={() => { handleStop() }} alt="" />
				</div>
				<div>
					<img className="previous" src="src/public/icons/icons8-skip-to-start-48.png" alt="" />
				</div>
				<div>
					<img className="next" src="src/public/icons/icons8-skip-to-start-48.png" alt="" />
				</div>
				<div className="volume-container">
					<img className="volume-img" src="src/public/icons/icons8-sound-speaker-48.png" alt="" />
					<input className="volume" type="range" min="0" max="1" step="0.05" defaultValue="1" onChange={(e) => { handleVolChange(e) }}></input>
				</div>
			</section>
		</main>
	)
}

function timeFormat(sec) {
	const time = Math.round(sec);
	let minutes = Math.floor(time / 60);
	minutes = timeNumPrcs(minutes);
	let seconds = time - minutes * 60;
	seconds = timeNumPrcs(seconds);
	return { frmtTime: minutes + ':' + seconds, rndSec: time };
}

function timeNumPrcs(num = 0) {
	num = num + '';
	return num = (num.length > 1) ? num : '0' + num;
}

export default MediaPlayer;