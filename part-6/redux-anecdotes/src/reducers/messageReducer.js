const initialState = "test message";

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: "Display",
      message,
    });
    setTimeout(() => {
      dispatch({ type: "Hide" });
    }, 1000*seconds);
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Display":
      return action.message;

    case "Hide":
      return "";
    default:
      return state;
  }
};

export default reducer;
