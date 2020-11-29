const Course = ({ course }) => {
  const total = course.parts.reduce((sum, parts) => sum + parts.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
    </div>
  );
};

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
      <Total course={course} />
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, parts) => sum + parts.exercises, 0);

  return <strong>Number of exercises {total}</strong>;
};

export default Course;
