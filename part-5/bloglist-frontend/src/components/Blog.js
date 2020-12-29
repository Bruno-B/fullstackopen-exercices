import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [view, setView] = useState(false);
  const handleLikes = (params) => {
    const blog = {
      user: params.user.id,
      likes: params.likes + 1,
      author: params.author,
      title: params.title,
      url: params.url,
    };
    blogService.update(params.id, blog);
  };
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
          <p>likes {blog.likes}</p>
          <button onClick={() => handleLikes(blog)}>like</button>
          <p>{blog.author} </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
