import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [max,setMax] = useState(0);

  function handleButton() {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }
  function voteButton() {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    if(copy[selected] > max)setMax(copy[selected])
  }

  return (
    <div>
      {props.anecdotes[selected]}
      {points[selected] > 0 ? (
        <p>has votes: {points[selected]}</p>
      ) : (
        <p>has vote:0</p>
      )}
      <button onClick={voteButton}>vote</button>
      <button onClick={handleButton}>next anecdotes</button>

      <h1>anecdotes with most votes</h1>
      <p>{anecdotes[points.findIndex((value)=>value===max)]}</p>
    </div>
  );
};


const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
