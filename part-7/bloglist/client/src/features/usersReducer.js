const initialState = null;

const SET_USER = "SET_USER";
const UNSET_USER = "UNSET_USER";

export const setUser = (user) => {
	return {
		type:SET_USER,
		payload:user
	};
};

export const logoutUser = () => {
	return {
		type:UNSET_USER,
	};
};

const usersReducer = (state = initialState,action) => {
	switch (action.type) {
	case SET_USER:
		return action.payload;
  
	case UNSET_USER:
		return null;
	default:
		return state;
	}
};




export default usersReducer;