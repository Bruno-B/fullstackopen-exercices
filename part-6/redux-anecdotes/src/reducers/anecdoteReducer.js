import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const ADD = "ADD";
const VOTE = "VOTE";
const INIT_ANECDOTES = "INIT_ANECDOTES";

const updateAnecdoteVotesInArray = (array, id) => {
  return array.map((item) => {
    if (item.id === id) return { ...item, votes: item.votes + 1 };
    else return item;
  });
};

export const voteAnecdote = (id) => {
  return {
    type: VOTE,
    payload: id,
  };
};

export const createAnecdote = (text) => {
  return {
    type: ADD,
    payload: text,
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: INIT_ANECDOTES,
      payload: anecdotes,
    });
  };
};

const createNewAnecdote = (array, text) => {
  return [...array, { content: text, id: getId(), votes: 0 }];
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case VOTE:
      return updateAnecdoteVotesInArray(state, action.payload);

    case ADD:
      return createNewAnecdote(state, action.payload);

    case INIT_ANECDOTES:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
