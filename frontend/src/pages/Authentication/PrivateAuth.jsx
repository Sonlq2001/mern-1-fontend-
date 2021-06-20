import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateAuth = ({ children }) => {
	const { user } = isAuthenticated();
	return (
		<Route
			render={() => {
				return !user ? children : <Redirect to={{ namepath: "/" }} />;
			}}
		/>
	);
};

export default PrivateAuth;
