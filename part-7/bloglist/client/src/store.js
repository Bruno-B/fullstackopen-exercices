import { createStore, combineReducers, applyMiddleware } from "redux";
import blogsReducer   from"./features/blogsReducer";
import notificationReducer from "./features/notificationReducer";
import  usersReducer  from "./features/usersReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));


const rootReducer = combineReducers({
	users:usersReducer,
	blogs:blogsReducer,
	notification:notificationReducer
});


const store = createStore(rootReducer,composedEnhancer);

export default store;