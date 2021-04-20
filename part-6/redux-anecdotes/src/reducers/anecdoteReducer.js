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

const createNewAnecdote = (array, text) => {
  return [...array, { content: text, id: getId(), votes: 0 }];
};


const reducer = (state = [], action) => {
  switch (action.type) {
    case VOTE:
      return updateAnecdoteVotesInArray(state, action.payload);

    case ADD:
      return createNewAnecdote(state, action.payload);

    default:
      return state;
  }
};

export default reducer;
