/* eslint-disable react/prop-types */
import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

const NewBlog = (props) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleNewBlog = (event) => {
		event.preventDefault();

		props.createBlog({
			title, author, url
		});

		setTitle("");
		setAuthor("");
		setUrl("");
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleNewBlog}>
				<div>
					<TextField
						label="author"
						variant= "standard"
						id='author'
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					<TextField
						variant= "standard"
						label="title"
						id='title'
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					<TextField
						variant= "standard"			
						label="url"
						id='url'
						value={url}
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<Button variant = "outlined" color = "primary" id="create">create</Button>
			</form>
		</div>
	);
};

export default NewBlog;