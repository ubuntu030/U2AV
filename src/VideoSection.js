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
					<li>喬瑟與虎與魚群『主題曲』 Eve - 蒼のワルツ (蒼之華爾茲)【中日歌詞】</li>
					<li>2</li>
					<li>3</li>
				</ul>
			</section>
		</main>
	)
}

export default VideoSection
