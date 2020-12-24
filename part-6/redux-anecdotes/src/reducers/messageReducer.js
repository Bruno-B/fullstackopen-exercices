const initialState = "test message";

export const displayNotification = (message) => {
  return {
    type: "Display",
    message: message,
  };
};

export const hideNotification = () => {
  return {
    type: "Hide",
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
