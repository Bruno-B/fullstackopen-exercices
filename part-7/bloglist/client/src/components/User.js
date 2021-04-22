import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import userService from "../services/users";

const User = () => {
	const [user,setUser] = useState(null);
	const {id} = useParams();
	useEffect( () => {
		(	async () => {
			const users = await userService.getAll();
			setUser(users.find(user => user.id === id));
		})();
		
	},[]);

	if (!user)return null;

	return (
		<div>
			{console.log(user)}
			<h2> {user.name} </h2>
			<p>added blogs</p>
			<ul>
				{user.blogs.map(blog => {
					return  <li key= {blog.id} > {blog.title} </li>;
				})}
			</ul>
		</div>
	);
};

export default User;