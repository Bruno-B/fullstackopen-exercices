import { Container } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./store";

ReactDOM.render(
	<Provider store = {store}>
		<Router>
			<Container maxWidth="sm">
				<App />
			</Container>
		</Router>
	</Provider>
	, document.getElementById("root"));