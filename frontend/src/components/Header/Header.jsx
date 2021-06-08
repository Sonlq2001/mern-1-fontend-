import React from "react";
// import PropTypes from "prop-types";

// component
import Header_top from "./Header_top";
import Navbar_header from "./Navbar_header";

function Header(props) {
	return (
		<>
			<div className="container">
				<Header_top />
			</div>
			<Navbar_header />
		</>
	);
}

// Header.propTypes = {};

export default Header;
