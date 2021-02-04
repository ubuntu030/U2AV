// https://dev.to/jamland/audio-player-with-wavesurfer-js-react-1g3b
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";

import "./MediaPlayer.scss";

const MediaPlayer = () => {
	const wavesurferRef = useRef(null);

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
	}, []);


	return (
		<main className="media-player">
			<section className="wavesurfer-container">
				<div ref={wavesurferRef} className="wavesurfer-player"></div>
			</section>
			<section className="run-time">
				<div className="now">
					<p>01:25</p>
				</div>
				<div className="total">
					<p>04:38</p>
				</div>
			</section>
			<section className="media-detail">
				<div className="title">
					title
				</div>
				<div className="meta">
					ext
				</div>
			</section>
			<section className="control-bar">
				<div>
					play/pause
				</div>
				<div>
					stop
				</div>
				<div>
					forward
				</div>
				<div>
					backward
				</div>
			</section>
		</main>
	)
}

export default MediaPlayer;