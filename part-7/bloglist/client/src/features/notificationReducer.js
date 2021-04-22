const initialState = null;
const SET = "SET";
const HIDE = "HIDE";

export const setNotification = (message) => {
	return async (dispatch) => {
		dispatch(showNotification(message));
		setTimeout(() => {
			dispatch(hideNotification());
		}, 5000);
	};
};
const showNotification = (message) => {
	return {
		type:SET,
		payload:message
	};
};

export const hideNotification = () => {
	return {
		type:HIDE,

	};
};

const notificationReducer = (state = initialState , action) => {
	switch (action.type) {
	case SET:
      
		return {message:action.payload.message,type:action.payload.type};
  
	case HIDE:
		return null;
	default:
		return state;
	}
};



export default notificationReducer;