import React, { useEffect, useState } from "react";
import userService from "../services/users";
const Users = () => {

	const [users,setUsers] = useState([]);

	useEffect(() => {
		userService.getAll().then(res =>setUsers(res));

	},[]);

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				{console.log(users)}
				<tbody>
					{users.map(user => {
						return (
							<tr key = {user.id}>
								<td> {user.name} </td>
								<td> {user.blogs.length} </td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};


export default Users;