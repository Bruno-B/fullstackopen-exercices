import { TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../services/users";
const Users = () => {

	const [users,setUsers] = useState([]);

	useEffect(() => {
		userService.getAll().then(res =>setUsers(res));

	},[]);

	return (
		<div>
			<h2>Users</h2>
			<TableContainer>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Blogs Created</TableCell>
					</TableRow>
				</TableHead>
				<tbody>
					{users.map(user => {
						return (
							<TableRow key = {user.id}>
								<TableCell>
									<Link to = {`/users/${user.id}`}>
										{user.name}
									</Link>
								</TableCell>
								<TableCell> {user.blogs.length} </TableCell>
							</TableRow>
						);
					})}
				</tbody>
			</TableContainer>
		</div>
	);
};


export default Users;

