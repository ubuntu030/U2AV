import React from "react";
import { useSelector } from "react-redux";

function AudioSection() {
	return (
		<main className="audio-container">
			<section className="audio-section-1">
				<div className="play-section">
					Player
				</div>
				<div className="editor-section">
					Editor
				</div>
			</section>
			<section className="audio-list">
				<div className="section-decs">Audio List</div>
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

export default AudioSection