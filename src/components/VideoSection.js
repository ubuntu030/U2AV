import React from "react";

function VideoSection() {

	return (
		<main className="video-container">
			<div className="video-section-1">
				<section className="play-section">
					<div>
						<iframe src="https://www.youtube.com/embed/2J25YR3OcQ0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
					</div>
					<div className="video-download-container">
						<input type="text" className="download-input" placeholder="Video URL" />
						<div className="btn-group">
							<button className="btn-primary">Search</button>
							<button className="btn-primary">Download</button>
						</div>
					</div>
				</section>
				<section className="history-section">
					<div className="section-decs">search history</div>
					<ul>
						<li>喬瑟與虎與魚群『主題曲』 Eve - 蒼のワルツ (蒼之華爾茲)【中日歌詞】</li>
						<li>2</li>
						<li>3</li>
					</ul>
				</section>
			</div>

			<section className="download-section">
				<div className="section-decs">Download list</div>
				<ul>
					<li>喬瑟與虎與魚群『主題曲』 Eve - 蒼のワルツ (蒼之華爾茲)【中日歌詞】</li>
					<li>喬瑟與虎與魚群『主題曲』 Eve - 蒼のワルツ (蒼之華爾茲)【中日歌詞】</li>
					<li>喬瑟與虎與魚群『主題曲』 Eve - 蒼のワルツ (蒼之華爾茲)【中日歌詞】</li>
					<li>喬瑟與虎與魚群『主題曲』 Eve - 蒼のワルツ (蒼之華爾茲)【中日歌詞】</li>
				</ul>
			</section>
		</main>
	)
}

export default VideoSection
