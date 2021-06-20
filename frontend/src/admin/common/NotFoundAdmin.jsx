import React from "react";

const NotFoundAdmin = ({ title }) => {
	return (
		<div className="not-found-admin">
			<p className="not-found-admin__title">{title}</p>
			<img
				src="https://media.istockphoto.com/vectors/page-concept-not-found-search-result-icon-vector-id833475304?k=6&m=833475304&s=170667a&w=0&h=veXD2cLhfBeqJWFARtAgfGSySZf23DIfUcQG_UaDfMo="
				alt=""
				className="not-found-admin__img"
			/>
		</div>
	);
};

export default NotFoundAdmin;
