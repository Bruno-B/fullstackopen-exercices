import { applyMiddleware, combineReducers, createStore } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import messageReducer from "./reducers/messageReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'

const reducer = combineReducers({
    anecdote:anecdoteReducer,
    message:messageReducer
})
const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;
