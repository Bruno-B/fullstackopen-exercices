const initialState = "";

const SHOW = "SHOW";
const HIDE = "HIDE";

export const displayNotification = (text) => {
  return {
    type: SHOW,
    payload: text,
  };
};

export const hideNotification = () => {
  return {
    type: HIDE,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW:
      return action.payload;

    case HIDE:
      return "";
    default:
      return state;
  }
};

export default reducer;
