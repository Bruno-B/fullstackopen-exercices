import anecdoteService from "../services/anecdotes";

const ADD = "ADD";
const VOTE = "VOTE";
const INIT_ANECDOTES = "INIT_ANECDOTES";

const updateAnecdoteVotesInArray = (array, id) => {
  return array.map((item) => {
    if (item.id === id) return { ...item, votes: item.votes + 1 };
    else return item;
  });
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.vote(anecdote);
    dispatch({
      type: VOTE,
      payload: anecdote.id,
    });
  };
};

export const createAnecdote = (text) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(text);
    dispatch({
      type: ADD,
      payload: anecdote,
    });
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

const createNewAnecdote = (array, anecdote) => {
  return [...array, anecdote];
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
