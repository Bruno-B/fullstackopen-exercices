const initialState = [];

const INIT = "INIT";
const ADD = "ADD";
const REMOVE = "REMOVE";
const LIKE = "LIKE";
const COMMENT = "COMMENT";
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

export const commentBlog = (blog) => {
	return {
		type:COMMENT,
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

	case COMMENT:
		return state.map(b => b.id === action.payload.id ? {...action.payload,comments:action.payload.comments} : b);
	default:
		return state;
	}
};



export default blogsReducer;