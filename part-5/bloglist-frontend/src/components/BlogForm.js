import React from "react";
const BlogForm = ({
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
          id = "title"
        ></input>
        <br />
        <label>author</label>
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id="author"
        ></input>
        <br />
        <label>url</label>
        <input
          value={url}
          onChange={({ target }) => setURL(target.value)}
          id="url"
        ></input>
        <br />
        <button  id = "create-button"type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
