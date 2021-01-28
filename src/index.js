import React, { useState } from "react";
import { render } from "react-dom";

import Header from './Header';
import VideoSection from './VideoSection';

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