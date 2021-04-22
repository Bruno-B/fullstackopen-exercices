import { useParams } from "react-router";
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";


const DetailedBlog = ({handleLike,user,handleRemove}) => {
	const {id} = useParams();
	const blogs = useSelector(state => state.blogs); 
	const blog = blogs.find(blog => blog.id === id);
  
	if (!blog)return null;
	const own = user === blog.user.username;
	return (
		<div>
			<h2> {blog.title} </h2> 
			<a href = {blog.url} >{blog.url}</a>
			<div>likes {blog.likes}
				<button onClick={() => handleLike(blog.id)}>like</button>
			</div>
			<p> {`Added by ${blog.author}`} </p>
			{own && <button onClick = {() => handleRemove} >DELETE</button>}

			<h3>Comments</h3>
			<ul>
				{blog.comments.map((comment,id) => {
					return <li key = {id} > {comment} </li>;
				})}
			</ul>
		</div>
	);
};

DetailedBlog.propTypes = {
	user:PropTypes.string.isRequired	,
	handleLike: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired

};

export default DetailedBlog;