import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (text) => {
  const anecdote = {
    content: text,
    votes: 0,
    id: getId(),
  };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};
const getId = () => (100000 * Math.random()).toFixed(0);

const vote = async (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote);
  return response.data;
};

const service = {
  getAll,
  createNew,
  vote,
};

export default service;
