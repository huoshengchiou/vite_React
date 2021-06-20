import counterReducer from "./counter";
import { combineReducers } from "redux";
import reqStateReducer, { LoadReducer } from "./reqState";

//counter is key to state
const allReducer = combineReducers({
  counter: counterReducer,
  req: reqStateReducer,
  loading: LoadReducer,
});

export default allReducer;
