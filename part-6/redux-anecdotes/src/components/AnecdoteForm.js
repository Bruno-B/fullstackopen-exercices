import { useState } from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const [newAnecdoteText, setNewAnecdoteText] = useState("");

  const create = async (e) => {
    e.preventDefault();
    props.setNotification(`Added '${newAnecdoteText}'`, 10);
    props.createAnecdote(newAnecdoteText);
    setNewAnecdoteText("");
  };

  return (
    <form onSubmit={create}>
      <div>
        <input
          value={newAnecdoteText}
          onChange={(e) => setNewAnecdoteText(e.target.value)}
        />
      </div>
      <button>create</button>
    </form>
  );
};

const mapDispatchToProps = {
  setNotification,
  createAnecdote,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
