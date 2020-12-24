import { combineReducers, createStore } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import messageReducer from "./reducers/messageReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({
    anecdote:anecdoteReducer,
    message:messageReducer
})
const store = createStore(reducer, composeWithDevTools());

export default store;
