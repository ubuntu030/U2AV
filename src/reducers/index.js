import { combineReducers } from "redux";
import videoReducer from "./videoRdcr";
import audioReducer from "./audioRdcr";

// NOTICE: combineReducers have to use multiple reducer,otherwise it can't do initial state when I tyr to useSelector in component first time.
const rootReducer = combineReducers({
	videoReducer,
	audioReducer
});
export default rootReducer;
