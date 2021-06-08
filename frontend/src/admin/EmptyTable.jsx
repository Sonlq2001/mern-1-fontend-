import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EmptyTable = ({ title, description, path }) => {
	return (
		<>
			<div className="card text-center mt-5">
				<div className="card-header">Admin</div>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{description}</p>
					<Link to={path} className="btn btn-primary">
						Thêm
					</Link>
				</div>
				<div className="card-footer text-muted">2 days ago</div>
			</div>
		</>
	);
};

// EmptyTable.propTypes = {

// }

export default EmptyTable;
