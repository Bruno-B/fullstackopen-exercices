const initialState = null;
const SET_MESSAGE = "SET_MESSAGE";
const HIDE_MESSAGE = "HIDE_MESSAGE";

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
		type:SET_MESSAGE,
		payload:message
	};
};

export const hideNotification = () => {
	return {
		type:HIDE_MESSAGE,

	};
};

const notificationReducer = (state = initialState , action) => {
	switch (action.type) {
	case SET_MESSAGE:
      
		return {message:action.payload.message,type:action.payload.type};
  
	case HIDE_MESSAGE:
		return null;
	default:
		return state;
	}
};



export default notificationReducer;