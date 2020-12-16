import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
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
