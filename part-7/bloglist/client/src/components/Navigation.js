import { Link } from "react-router-dom";
import React from "react";
import { AppBar, List, ListItem } from "@material-ui/core";
const Navigation = () => {



	return (
		<AppBar>	
			<nav>
				<List display = "flex" flexDirection = "row" >
					<ListItem >
						<Link to = "/" style = {{color:"white"}}>
								Blogs
						</Link>
					</ListItem>
					<ListItem>

						<Link to = "/users" style = {{color:"white"}}>
							Users
						</Link>

					</ListItem>
				</List>
			</nav>
		</AppBar>

	);
};

export default Navigation;