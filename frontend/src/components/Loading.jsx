import React from "react";
import PropTypes from "prop-types";

const Loading = ({ loading_admin }) => {
	return (
		<div className={`loading ${loading_admin ? "loading-admin" : ""}`}>
			<div className="loading__round"></div>
		</div>
	);
};

// loading.propTypes = {

// }

export default Loading;
