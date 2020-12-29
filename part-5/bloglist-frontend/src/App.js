import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [addedBlog, setAddedBlog] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [author, setAuthor] = useState("");
  const [failedLogin, setFailedLogin] = useState(null);
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
  }, [<BlogForm />]);

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
      setFailedLogin(true);
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
      setAddedBlog(blog);
    } catch (error) {
      console.log(error);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <h1>log in to the application</h1>
        {failedLogin && (
          <Notification message={"wrong username or password"} color={"red"} />
        )}
        <form onSubmit={handleLogin}>
          <label>Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
          <br />
          <label>Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
          <br />
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    );
  };

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>

        {addedBlog && (
          <Notification
            message={`a new blog ${addedBlog.title} by ${addedBlog.author} was added`}
            color={"green"}
          />
        )}
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

        <Togglable buttonLabel="new note" id="new-note">
          <BlogForm
            user={user}
            addBlog={addBlog}
            title={title}
            author={author}
            url={url}
            setUser={setUser}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setURL={setURL}
            blogService={blogService}
          />
        </Togglable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} blogService={blogService} />
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
