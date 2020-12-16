import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(blog));
      setTitle("");
      setURL("");
      setAuthor("");
    } catch (error) {
      console.log(error);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <h1>log in to the application</h1>
        <form onSubmit={handleLogin}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
          <br />
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.username} logged in </p>
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogAppUser");
            setUser(null);
            blogService.setToken(null);
          }}
        >
          log out
        </button>

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

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  );
};

export default App;
