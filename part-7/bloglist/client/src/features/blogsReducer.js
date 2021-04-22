const initialState = [];

const INIT = "INIT";
const ADD = "ADD";
const REMOVE = "REMOVE";
const LIKE = "LIKE";
export const initializeBlogs = (blogs) => {
	return {
		type:INIT,
		payload:blogs
	};
};

export const addBlog = (blog) => {
	return {
		type:ADD,
		payload:blog
	};
};

export const removeBlog = (id) => {
	return {
		type:REMOVE,
		payload:id
	};
};

export const likeBlog = (blog) => {
	return {
		type:LIKE,
		payload:blog
	};
};

const blogsReducer = (state = initialState , action) => {
	switch (action.type) {
	case INIT:
		return action.payload;
  
	case ADD:
		return state.concat(action.payload);

	case REMOVE:
		return state.filter(b => b.id !== action.payload);

	case LIKE:
		return state.map(b => b.id === action.payload.id ?  { ...action.payload, likes: action.payload.likes + 1 } : b);
	default:
		return state;
	}
};



export default blogsReducer;