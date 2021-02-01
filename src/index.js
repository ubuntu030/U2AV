import React, { useState } from "react";
import { render } from "react-dom";

import Header from './components/Header';
import VideoSection from './components/VideoSection';

import "./style.scss";

function App() {
	return (
		<>
			<Header />
			<VideoSection />
		</>
	)

}

render(<App />, document.getElementById("root"));