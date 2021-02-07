// https://dev.to/jamland/audio-player-with-wavesurfer-js-react-1g3b
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";

import "./MediaPlayer.scss";

const MediaPlayer = ({ play = {} }) => {
	const wavesurferRef = useRef(null);
	const [isPlay, setIsPlay] = useState(false);
	const [totalT, setTotalT] = useState('00:00');
	const [crntT, setCrntT] = useState('00:00');
	const { title, meta } = play;

	const togglePlay = () => {
		// setIsPlay(!isPlay);
		wavesurferRef.current.playPause();
	}
	const handleStop = () => {
		wavesurferRef.current.stop();
	}
	let waveSurfer = null;
	useEffect(() => {
		waveSurfer = wavesurferRef.current =
			WaveSurfer.create({
				container: wavesurferRef.current,
				// plugins: [
				// 	RegionsPlugin.create({
				// 		regionsMinLength: 2,
				// 		dragSelection: {
				// 			slop: 5
				// 		}
				// 	})
				// ]
			});
		waveSurfer.load('src/media/Audio/Mr.Children 「Brand new planet」 from “MINE”.wav');
		waveSurferCtrl.call(this, { waveSurfer });
		waveSurfer.on('ready', () => {
			console.log('media loaded');
			setTotalT(timeFormat(waveSurfer.getDuration()));
		});
		waveSurfer.on('audioprocess', () => {
			setCrntT(timeFormat(waveSurfer.getCurrentTime()));
		});
		waveSurfer.on('seek', () => {
			setCrntT(timeFormat(waveSurfer.getCurrentTime()));
		});
		waveSurfer.on('finish', () => {
			console.log('play finished');
		});
		return () => {
			waveSurfer.destroy();
		}
	}, []);

	let ext = '';
	let bps = '';
	if (meta && meta.format) {
		ext = meta.format.format_name.toUpperCase();
		bps = meta.format.bit_rate + " bps";
	}
	return (
		<main className="media-player">
			<section className="wavesurfer-container">
				<div ref={wavesurferRef} className="wavesurfer-player"></div>
			</section>
			<section className="run-time">
				<div className="now">
					<p>{crntT}</p>
				</div>
				<div className="total">
					<p>{totalT}</p>
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
					<img className="play" src="src/public/icons/icons8-play-48.png" onClick={() => { togglePlay() }} alt="" />
					{/* {
						isPlay ?
							<img className="play" src="src/public/icons/icons8-pause-48.png" onClick={() => { handlePlay() }} alt="" /> :
							<img className="play" src="src/public/icons/icons8-play-48.png" onClick={() => { handlePlay() }} alt="" />
					} */}
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
			</section>
		</main>
	)
}

function waveSurferCtrl({ waveSurfer }) {

}

function timeFormat(sec) {
	const time = Math.round(sec);
	let minutes = Math.floor(time / 60);
	minutes = timeNumPrcs(minutes);
	let seconds = time - minutes * 60;
	seconds = timeNumPrcs(seconds);
	return minutes + ':' + seconds;
}

function timeNumPrcs(num = 0) {
	num = num + '';
	return num = (num.length > 1) ? num : '0' + num;
}

export default MediaPlayer;