import { combineReducers, createStore } from "redux";
import anecdoteReducer, { createAnecdote } from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import anecdoteService from "./services/anecdotes";

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});
const store = createStore(rootReducer, composeWithDevTools());

anecdoteService.getAll().then(anecdotes => {
  anecdotes.forEach(anecdote => {
    store.dispatch(createAnecdote(anecdote.content));
  });
});

export default store;
