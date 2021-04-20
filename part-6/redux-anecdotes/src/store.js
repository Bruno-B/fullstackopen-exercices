import { combineReducers, createStore } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
});
const store = createStore(rootReducer, composeWithDevTools());
export default store;
