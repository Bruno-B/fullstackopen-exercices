import { Link } from "react-router-dom";
import React from "react";
const Navigation = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to = "/">blogs</Link>
					<Link to = "/users">users</Link>

				</li>
			</ul>
		</nav>
	);
};

export default Navigation;