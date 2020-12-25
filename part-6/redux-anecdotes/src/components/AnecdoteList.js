import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import {
  displayNotification,
  hideNotification,
} from "../reducers/messageReducer";
const AnecdoteList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch]);

  const anecdotes = useSelector((state) => state.anecdote);
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
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
