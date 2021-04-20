import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAnecdote, voteAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const [newAnecdoteText, setNewAnecdoteText] = useState("");

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
  };

  const create = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(newAnecdoteText));
    setNewAnecdoteText("");
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input
            value={newAnecdoteText}
            onChange={(e) => setNewAnecdoteText(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
