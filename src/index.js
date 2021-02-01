import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Header from './components/Header';
import VideoSection from './components/VideoSection';
import AudioSection from './components/AudioSection';

import "./style.scss";

function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route path="/" exact>
					<VideoSection />
				</Route>
				<Route path="/audio">
					<AudioSection />
				</Route>

			</Switch>
		</Router>
	)

}

render(<App />, document.getElementById("root"));