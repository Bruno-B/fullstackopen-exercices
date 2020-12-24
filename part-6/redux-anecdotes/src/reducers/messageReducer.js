const initialState = "test message"

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Notification":
      return state.message;

    default:
      return state;
  }
};

export default reducer;
