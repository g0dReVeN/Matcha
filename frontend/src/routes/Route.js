import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import jwt from 'jsonwebtoken';

export default function RouteWrapper({ render: Render, Auth, Admin, ...rest }) {
	let isLoggedIn = false;

	if (localStorage.hasOwnProperty('access_token')) {
		jwt.verify(localStorage.access_token, process.env.REACT_APP_JWT_PUBLIC_KEY, { algorithms: ['ES256'] }, (err, payload) => {
			if (err) {
				localStorage.clear();
				console.log(err);
			}
			else
				isLoggedIn = true;
		});
	}
	else {
		localStorage.clear();
	}

	/**
	 * Redirect user to SignIn page if he tries to access a private route
	 * without authentication.
	 */
	if (Auth && !isLoggedIn) {
		return <Redirect to="/login" />;
	}

	/**
	 * Redirect user to Main page if he tries to access a non private route
	 * (SignIn or SignUp) after being authenticated.
	 */
	if (!Auth && isLoggedIn) {
		return <Redirect to="/" />;
	}

	/**
	 * If not included on both previous cases, redirect user to the desired route.
	 */
	return <Route {...rest} render={Render} />;
}

RouteWrapper.propTypes = {
	Auth: PropTypes.bool,
	Admin: PropTypes.bool,
	render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
	Auth: false,
	Admin: false,
};