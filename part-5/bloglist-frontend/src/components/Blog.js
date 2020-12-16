import React from "react";
const Blog = ({ blog }) => (
  <div>
    <p>{blog.author} logged in</p>
    <p>
      {blog.title} {blog.author}
    </p>
  </div>
);

export default Blog;
