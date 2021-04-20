import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [newAnecdoteText, setNewAnecdoteText] = useState("");

  const create = async (e) => {
    e.preventDefault();
    dispatch(displayNotification(`Added ${newAnecdoteText}`));
    const newAnecdote = await anecdoteService.createNew(newAnecdoteText);
    dispatch(createAnecdote(newAnecdoteText));
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

export default AnecdoteForm;
