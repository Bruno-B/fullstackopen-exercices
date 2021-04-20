const initialState = "WARNING"

const MESSAGE = "MESSAGE";

export const displayMessage = (text) => {
  return {
    type:MESSAGE,
    payload:text
  }
}

const reducer = (state = initialState , action) => {
  switch (action.type) {
    case MESSAGE:
      
      return action.payload;
  
    default:
      return state;
  }
}


export default reducer;