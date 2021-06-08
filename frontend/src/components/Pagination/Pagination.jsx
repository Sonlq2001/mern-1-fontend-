import React from "react";
import PropTypes from "prop-types";

const Pagination = (props) => {
	return (
		<>
			<div className="pagination-group">
				<ul className="pagination-list">
					<li className="pagination-item">
						<a href="" className="pagination-page active">
							1
						</a>
					</li>

					<li className="pagination-item">
						<a href="" className="pagination-page">
							2
						</a>
					</li>

					<li className="pagination-item">
						<a href="" className="pagination-page">
							&#187;
						</a>
					</li>
				</ul>
			</div>
		</>
	);
};

// Pagination.propTypes = {

// }

export default Pagination;
