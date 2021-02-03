import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchVideoPadding, fetchVideoSuccess, fetchVideoError, downloadVideoPadding, downloadVideoSuccess, downloadVideoError } from "../actions";

function VideoSection() {
	const [url, setUrl] = useState('');
	const [embedUrl, setEmbedUrl] = useState('');
	const { search_history, download_list, iframe_loading, download_loading } = useSelector(state => state.videoReducer);
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
			setEmbedUrl(result.videoDetails.embed.iframeUrl);
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
		dispatch(downloadVideoPadding());
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
	/**
	 * 取得檔案的mata
	 * @param {String} filePath 檔案路徑
	 */
	const getMeta = async (filePath) => {
		try {
			const result = await (await fetch('http://localhost:3000/getMeta', {
				method: 'POST',
				body: JSON.stringify({ filePath: filePath }),
				headers: {
					'content-type': 'application/json'
				}
			})).json();
			console.log('[getMeta] ok:', result);
			console.log(result);
		} catch (error) {
			console.log('[getMeta] err:', error);
		}
	}
	/**
	 * 在歷史清單上點擊項目可以替換 ifram上的video
	 * @param {String} id id of video
	 */
	const handleHstyItemClick = (id) => {
		// const filtedItem = search_history.filter(item => item.id === id)[0];
		setEmbedUrl('https://www.youtube.com/embed/' + id);
	}

	return (
		<main className="video-container">
			<div className="video-section-1">
				<section className="play-section">
					<div className="iframe-container">
						{iframe_loading ?
							<div className="loader"></div>
							: <iframe src={embedUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
						}
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
						{search_history.map(item => <li key={item.id} onClick={() => handleHstyItemClick(item.id)}>{item.title}</li>)}
					</ul>
				</section>
			</div>

			<section className="download-section">
				<div className="section-decs">Download list</div>
				<ul>
					{download_list.map(item => <li key={item.id} onClick={() => getMeta(item.downloadFilePath)}>{item.title}</li>)}
				</ul>
				{download_loading ? <div className="loader"></div> : null}
			</section>
		</main>
	)
}

export default VideoSection
