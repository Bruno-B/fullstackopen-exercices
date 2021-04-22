import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./utils/storage";
import { addBlog, initializeBlogs,likeBlog, removeBlog } from "./features/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import {  setNotification } from "./features/notificationReducer";
import { logoutUser, setUser } from "./features/usersReducer";
import Navigation from "./components/Navigation";
import { Route, Switch } from "react-router";
import Users from "./components/Users";
import User from "./components/User";
import DetailedBlog from "./components/DetailedBlog";


const App = () => {
	const blogs = useSelector(state => state.blogs);
	const notification = useSelector(state => state.notification);
	const user = useSelector(state => state.users);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	

	const blogFormRef = React.createRef();

	useEffect(() => {
		blogService.getAll().then(blogs =>
			dispatch(initializeBlogs(blogs))
		);
	}, []);

	useEffect(() => {
		const user = storage.loadUser();
		dispatch(setUser(user));
		
	}, []);

	const notifyWith = (message, type="success") => {
		dispatch(setNotification({message,type}));
		
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username, password
			});

			setUsername("");
			setPassword("");
			dispatch(setUser(user));
			notifyWith(`${user.name} welcome back!`);
			storage.saveUser(user);
		} catch(exception) {
			notifyWith("wrong username/password", "error");
		}
	};

	const createBlog = async (blog) => {
		try {
			const newBlog = await blogService.create(blog);
			blogFormRef.current.toggleVisibility();
			dispatch(addBlog(newBlog));
			notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`);
		} catch(exception) {
			console.log(exception);
		}
	};

	const handleLike = async (id) => {
		const blogToLike = blogs.find(b => b.id === id);
		const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id };
		await blogService.update(likedBlog);
		dispatch(likeBlog(blogToLike));
	};

	const handleRemove = async (id) => {
		const blogToRemove = blogs.find(b => b.id === id);
		const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`);
		if (ok) {
			await blogService.remove(id);
			dispatch(removeBlog(id));
		}
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		storage.logoutUser();
	};

	if ( !user ) {
		return (
			<div>
				<h2>login to application</h2>

				<Notification notification={notification} />

				<form onSubmit={handleLogin}>
					<div>
            username
						<input
							id='username'
							autoComplete= "username"
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
            password
						<input
							id='password'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
							type="password"
							autoComplete= "current-password"
						/>
					</div>
					<button id='login'>login</button>
				</form>
			</div>
		);
	}

	const byLikes = (b1, b2) => b2.likes - b1.likes;

	return (
		<div>
			<Navigation/>

			<h2>blog app</h2>
			<Notification notification={notification} />

			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>

			
			<Switch>
				
				<Route exact path ="/">
					<Togglable buttonLabel='create new blog'  ref={blogFormRef}>
						<NewBlog createBlog={createBlog} />
					</Togglable>

					{blogs.sort(byLikes).map(blog =>
						<Blog
							key={blog.id}
							blog={blog}
							handleLike={handleLike}
							handleRemove={handleRemove}
							own={user.username===blog.user.username}
						/>
					)}
				</Route>
				<Route exact path ="/users">
					<Users/>
				</Route>
				<Route path = "/users/:id">
					<User/>
				</Route>
				<Route path ="/blogs/:id">
					<DetailedBlog handleLike = {handleLike} user = {user.username} handleRemove = {handleRemove} />
				</Route>
				
			</Switch>
		</div>
	);
};

export default App;