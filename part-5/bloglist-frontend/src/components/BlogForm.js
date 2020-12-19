import React from "react";
import Blog from "./Blog";
const BlogForm = ({
  blogs,
  addBlog,
  title,
  author,
  url,

  setTitle,
  setAuthor,
  setURL,
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label>title</label>
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        ></input>
        <br />
        <label>author</label>
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
        <br />
        <label>url</label>
        <input
          value={url}
          onChange={({ target }) => setURL(target.value)}
        ></input>
        <br />
        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogForm;
