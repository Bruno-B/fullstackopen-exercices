import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/messageReducer";

const AnecdoteList = (props) => {
  useEffect(() => {
    props.initializeAnecdotes();
  }, []);

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted ${anecdote.content}`,5)
  }
  return (
    <div>
      {props.anecdotes.map((anecdote) => (
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

const mapDispatchToProps = {
  voteAnecdote,
  initializeAnecdotes,
  setNotification
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdote,
  };
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;
