import React from "react";
// import PropTypes from 'prop-types'
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./../pages/Authentication/index";

const PrivateRoute = ({ children }) => {
	const { user } = isAuthenticated();
	return (
		<Route
			render={() => {
				return user && user.role === 1 ? (
					children
				) : (
					<Redirect to={{ pathname: "/" }} />
				);
			}}
		/>
	);
};

// PrivateRoute.propTypes = {

// }

export default PrivateRoute;
