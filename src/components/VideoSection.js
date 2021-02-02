import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchVideoPadding, fetchVideoSuccess, fetchVideoError } from "../actions";

function VideoSection() {
	const [url, setUrl] = useState('');
	const { search_history, download_list } = useSelector(state => state.videoReducer);
	const dispatch = useDispatch();
	// 取得影片資訊
	const fetchVideoInfo = async (url = 'https://youtu.be/xXA5StMti8c') => {
		dispatch(fetchVideoPadding());
		try {
			const result = await (await fetch('http://localhost:3000/getInfo', {
				method: 'POST',
				body: JSON.stringify({ url: url }),
				headers: {
					'content-type': 'application/json'
				},
			})).json();
			dispatch(fetchVideoSuccess(result));
			console.log('[fetchVideoInfo] ok:', result);
			return result;
		} catch (error) {
			console.log('[fetchVideoInfo] err:', error);
			dispatch(fetchVideoError(error));
		}
	}

	const handleSearchClick = () => {
		fetchVideoInfo(url);
	}

	return (
		<main className="video-container">
			<div className="video-section-1">
				<section className="play-section">
					<div>
						<iframe src={lastSearchEmbedUrl(search_history)} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
					</div>
					<div className="video-download-container">
						<input type="text" onChange={e => setUrl(e.target.value)} className="download-input" placeholder="Video URL" value={url} />
						<div className="btn-group">
							<button onClick={handleSearchClick} className="btn-primary">Search</button>
							<button className="btn-primary">Download</button>
						</div>
					</div>
				</section>
				<section className="history-section">
					<div className="section-decs">search history</div>
					<ul>
						{search_history.map(item => <li>{item.title}</li>)}
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

/**
 * 提出搜尋歷史的最後一筆資料的嵌入網址
 * @param {Array} search_history 
 * @return {String}
 */
function lastSearchEmbedUrl(search_history = []) {
	let embedUrl = '';
	if (Array.isArray(search_history) && search_history.length > 0) {
		embedUrl = search_history[search_history.length - 1].embed.iframeUrl;
	}
	return embedUrl;
}

export default VideoSection
