import { combineReducers, createStore } from "redux";

import _location from "./location";
import _auth from "./auth";
import _rider from "./rider";

const allReducers = combineReducers({
  _location,
  _auth,
  _rider,
});

const store = createStore(allReducers, {});

export default store;
