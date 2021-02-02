import React, { useState } from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './components/Header';
import VideoSection from './components/VideoSection';
import AudioSection from './components/AudioSection';
import rootReducer from "./reducers";

import "./style.scss";

// redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middlewares))
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