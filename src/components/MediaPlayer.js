import React from "react";

import "./MediaPlayer.scss";

const MediaPlayer = () => {
	return (
		<main className="media-player">
			<section className="wavesurfer-container">
				wavesurfer-container
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
				media-detail
			</section>
			<section className="control-bar">
				control-bar
			</section>
		</main>
	)
}

export default MediaPlayer;