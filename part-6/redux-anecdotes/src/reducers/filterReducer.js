const initialState = [];

const FILTER = "FILTER";

export const filter = (text) => {
  return {
    type: FILTER,
    payload: text,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
