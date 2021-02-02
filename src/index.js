import React, { useState } from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './components/Header';
import VideoSection from './components/VideoSection';
import AudioSection from './components/AudioSection';
import rootReducer from "./reducers";

import "./style.scss";

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
	return (
		<Provider store={store}>
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
		</Provider>
	)

}

render(<App />, document.getElementById("root"));