import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async(text) => {
  const anecdote = {
    content:text,
    likes:0,
  }
  const response = await axios.post(baseUrl,anecdote);
  return response.data;
}


const service = {
  getAll,
  createNew
};

export default service;
