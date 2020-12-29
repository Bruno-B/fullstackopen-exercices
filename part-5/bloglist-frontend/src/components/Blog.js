import React, { useState } from "react";
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [view, setView] = useState(false);
  const handleClick = () => {
    setView(!view);
  };
  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        {view ? (
          <button onClick={handleClick}>hide</button>
        ) : (
          <button onClick={handleClick}>view</button>
        )}
      </p>
      {view && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button> </p>
          <p>{blog.author} </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
