import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  displayNotification,
  hideNotification,
} from "../reducers/messageReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(voteAnecdote(anecdote.id));
    dispatch(displayNotification(`you voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
