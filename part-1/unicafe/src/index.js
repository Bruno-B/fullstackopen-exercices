import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} handleClick={() => setGood(good + 1)} />
      <Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={"bad"} handleClick={() => setBad(bad + 1)} />
      <Statistics title="statistics" good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ title, good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all > 0) {
    return (
      <div>
        <h1>{title}</h1>
        <table>
        <Statistic text = 'good' value = {good}/>
        <Statistic text = 'neutral' value = {neutral}/>
        <Statistic text = 'bad' value = {bad}/>
        <Statistic text = 'all' value = {all}/>
        <Statistic text = 'average' value = {(good - bad) / all }/>
        <Statistic text = 'positive' value = {(good / all) * 100 + '%'}/>
        </table>
      </div>
    );
  }
  return <p>No feeback given</p>;
};

const Statistic = ({text,value}) => {
return <tr>
  <td> {text}</td>
<td>{value}</td>
</tr>
};

ReactDOM.render(<App />, document.getElementById("root"));
