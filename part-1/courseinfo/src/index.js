import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercices: 10,
      },

      {
        name: "Using props to pass data",
        exercices: 7,
      },

      {
        name: "State of a component",
        exercices: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course} </h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]}  />
      <Part part={props.parts[1]}  />
      <Part part={props.parts[2]}  />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.parts[0].exercices + props.parts[1].exercices + props.parts[2].exercices}</p>;
};

const Part = (props) => {
  console.log(props.part.exercices)
  return (
    <p>
      {props.part.name} {props.part.exercices}
    </p>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
