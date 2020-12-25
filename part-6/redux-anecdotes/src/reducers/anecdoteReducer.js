import anecdoteService from "../services/anecdotes";

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdotes = await anecdoteService.createNew(content);
    dispatch({
      type: "Add",
      data: newAnecdotes,
    });
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch({
      type: "Increment",
      data: votedAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "Increment":
      const changedAnecdote = action.data;
      const id = changedAnecdote.id;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );

    case "INIT_ANECDOTES":
      return action.data;

    case "Add":
      const content = action.data.content;
      return state.concat({ content, votes: 0 });
    default:
      return state;
  }
};

export default reducer;
