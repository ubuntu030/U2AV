import React from "react";

function VideoSection() {

	return (
		<main className="video-container">
			<section className="play-section">
				<iframe src="https://www.youtube.com/embed/2J25YR3OcQ0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</section>
			<section className="history-section">
				<div className="section-decs">search history</div>
				<ul>
					<li>1</li>
					<li>2</li>
					<li>3</li>
				</ul>
			</section>
		</main>
	)
}

export default VideoSection
