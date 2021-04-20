const initialState = "";

const SET = "SET";
const HIDE = "HIDE";

export const showNotification = (message) => {
  return {
    type: SET,
    payload: message,
  };
};

export const hideNotification = () => {
  return {
    type: HIDE,
  };
};

export const setNotification = (message, timeInSeconds) => {
  return  (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification());
    }, timeInSeconds * 1000);
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return action.payload;

    case HIDE:
      return "";
    default:
      return state;
  }
};

export default reducer;
