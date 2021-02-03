import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchVideoPadding, fetchVideoSuccess, fetchVideoError, downloadVideoSuccess, downloadVideoError } from "../actions";

function VideoSection() {
	const [url, setUrl] = useState('');
	const { search_history, download_list } = useSelector(state => state.videoReducer);
	const dispatch = useDispatch();
	// 取得影片資訊
	const fetchVideoInfo = async (url) => {
		dispatch(fetchVideoPadding());
		try {
			const result = await (await fetch('http://localhost:3000/getInfo', {
				method: 'POST',
				body: JSON.stringify({ url: url }),
				headers: {
					'content-type': 'application/json'
				}
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
	// 下載影片
	const downlaodVideo = async (url) => {
		try {
			const result = await (await fetch('http://localhost:3000/download', {
				method: 'POST',
				body: JSON.stringify({ url: url }),
				headers: {
					'content-type': 'application/json'
				}
			})).json();
			dispatch(downloadVideoSuccess(result));
		} catch (error) {
			console.log('[downloadVideo] err:', error);
			dispatch(downloadVideoError(error));
		}
	}
	const handleDownloadClick = () => {
		downlaodVideo(url);
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
							<button onClick={handleDownloadClick} className="btn-primary">Download</button>
						</div>
					</div>
				</section>
				<section className="history-section">
					<div className="section-decs">search history</div>
					<ul>
						{search_history.map(item => <li key={item.id}>{item.title}</li>)}
					</ul>
				</section>
			</div>

			<section className="download-section">
				<div className="section-decs">Download list</div>
				<ul>
					{download_list.map(item => <li key={item.id}>{item.title}</li>)}
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
