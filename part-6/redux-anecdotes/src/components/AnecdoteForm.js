import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {

  const dispatch = useDispatch();
  const [newAnecdoteText, setNewAnecdoteText] = useState("");

  const create = (e) => {
    e.preventDefault();
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
  )
}


export default AnecdoteForm;