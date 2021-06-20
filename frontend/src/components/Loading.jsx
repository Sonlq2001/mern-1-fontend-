import React from "react";

const Loading = ({ loading_admin }) => {
	return (
		<div className={`loading ${loading_admin ? "loading-admin" : ""}`}>
			<div className="loading__round"></div>
		</div>
	);
};

export default Loading;
