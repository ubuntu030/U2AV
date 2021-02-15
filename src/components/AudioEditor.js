import React, { useState, useEffect } from "react";

const inputCtnStyle = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	padding: '12px 20px'
}

const AudioEditor = ({ url, info }) => {
	const [newTitle, setNewTitle] = useState(info.title);
	const [trimTime, setTrimTime] = useState({ bg: {}, ed: {} });

	const editAduioRequest = async () => {
		const secObj = converToSec({ ...trimTime });
		try {
			const result = await (await fetch('http://localhost:3000/edit', {
				method: 'POST',
				body: JSON.stringify({ title: newTitle, ...secObj }),
				headers: {
					'content-type': 'application/json'
				}
			})).json();
			console.log('[edit] ok:', result);
			// dispatch(fetchAudiosSuccess(result));
		} catch (error) {
			console.error('[edit] err:', error);
			// dispatch(fetchAudiosError());
		}
	}
	const handleEditClick = () => {
		editAduioRequest();
	}
	const handleTimeChange = (e, pos, time) => {
		const { value } = e.target;
		let nTime = { ...trimTime };

		nTime[pos][time] = value;
		setTrimTime(nTime);
	}

	useEffect(() => {
		let title = (info && info.title) ? 'TRIM_' + info.title : '';
		setNewTitle(title);
	}, [info]);

	const { title = '' } = info;
	return (
		<div className="audio-editor-container">
			<div>
				<h3>{(title) ? title : 'Trim audio~'}</h3>
			</div>
			<div className="title-input-ctn">
				<label>TITLE</label>
				<input type="text" value={newTitle} onChange={e => { setNewTitle(e.target.value) }} />
			</div>
			<div className="time-input-ctn">
				<div>
					<label>START</label>
					<div className="time-input-container" style={inputCtnStyle}>
						<input onChange={(e) => { handleTimeChange(e, 'bg', 'h') }} type='number' min='0' max='24' />
						<label>H</label>
						<input onChange={(e) => { handleTimeChange(e, 'bg', 'm') }} type='number' min='0' max='59' />
						<label>M</label>
						<input onChange={(e) => { handleTimeChange(e, 'bg', 's') }} type='number' min='0' max='59' />
						<label>S</label>
					</div>
				</div>
				<div>
					<label>END</label>
					<div className="time-input-container" style={inputCtnStyle}>
						<input onChange={(e) => { handleTimeChange(e, 'ed', 'h') }} type='number' min='0' max='24' />
						<label>H</label>
						<input onChange={(e) => { handleTimeChange(e, 'ed', 'm') }} type='number' min='0' max='59' />
						<label>M</label>
						<input onChange={(e) => { handleTimeChange(e, 'ed', 's') }} type='number' min='0' max='59' />
						<label>S</label>
					</div>
				</div>
				<div>
					<button onClick={handleEditClick}>Edit</button>
				</div>
			</div>
		</div>
	)
}

const converToSec = (timeObj) => {
	// let { bg, ed } = timeObj;

	const multiKey = { h: 360, m: 60, s: 1 };
	let bgSec = 0;
	let edSec = 0;

	let time = 0;
	Object.keys(timeObj.bg).forEach(key => {
		time = timeObj.bg[key];
		bgSec += (time * multiKey[key]);
	})
	Object.keys(timeObj.ed).forEach(key => {
		time = timeObj.ed[key];
		edSec += (time * multiKey[key]);
	})
	console.log(bgSec, edSec);
	return {
		bg: bgSec,
		ed: edSec
	}
}

export default AudioEditor;