import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer";
const AnecdoteList = (props) => {
  useEffect(() => {
    props.initializeAnecdotes();
  }, []);
  return (
    <div>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => props.voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  voteAnecdote,
  initializeAnecdotes,
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
