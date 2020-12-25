export const createAnecdote = (content) => {
  return {
    type: "Add",
    data: content 
  };
};

export const voteAnecdote = (id) => {
  return {
    type: "Increment",
    data: { id },
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type:"INIT_ANECDOTES",
    data:anecdotes
  }
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "Increment":
      const id = action.data.id;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
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
