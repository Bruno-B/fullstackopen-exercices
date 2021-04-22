import { useParams } from "react-router";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import { commentBlog } from "../features/blogsReducer";
import { Box, Button, TextField } from "@material-ui/core";

const DetailedBlog = ({handleLike,user,handleRemove}) => {
	const {id} = useParams();
	const blogs = useSelector(state => state.blogs); 
	const blog = blogs.find(blog => blog.id === id);
	const [comment,setComment] = useState("");
	const dispatch = useDispatch();
	const submitComment = () => {
		blogService.comment(blog,{comment});
		const commentedBlog = { ...blog, comments:blog.comments.concat(comment) };
		dispatch(commentBlog(commentedBlog));
		setComment("");
	};

	if (!blog)return null;
	const own = user === blog.user.username;
	return (
		<div>
			<div>
				<h2> {blog.title} </h2> 
				<a href = {blog.url} >{blog.url}</a>
				<div>likes {blog.likes}
					<Button variant="outlined" color = "primary" onClick={() => handleLike(blog.id)}>like</Button>
				</div>
				<p> {`Added by ${blog.author}`} </p>
				{own && <Button variant = "contained" color = "secondary" onClick = {() => handleRemove} >DELETE</Button>}
			</div>
			<div>
				<h2>Comments</h2>
				<ul>
					{blog.comments.map((comment,id) => {
						return <Box 
							borderRadius = {20} 
							border = {1} minHeight = {20} 
							margin = {1} padding = {2} 
							key = {id} > {comment} 
						</Box>;
					})}
				</ul>
			</div>
			<div>
				<TextField variant = "outlined" value = {comment} onChange = {(e) => setComment(e.target.value)} />
				<Button variant = "outlined" color = "primary" onClick = {submitComment} >add comment</Button>
			</div>
		</div>
	);
};

DetailedBlog.propTypes = {
	user:PropTypes.string.isRequired	,
	handleLike: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired

};

export default DetailedBlog;