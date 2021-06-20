import React from "react";
// import PropTypes from "prop-types";

const Pagination = ({ productPerPage, total, paginate }) => {
	const pageNumber = [];

	for (let i = 1; i < Math.ceil(total / productPerPage); i++) {
		pageNumber.push(i);
	}

	return (
		<>
			<div className="pagination-group">
				<ul className="pagination-list">
					{pageNumber.map((page) => {
						return (
							<li
								className="pagination-item"
								key={page}
								onClick={() => paginate(page)}
							>
								<span className="pagination-page">{page}</span>
							</li>
						);
					})}

					<li className="pagination-item">
						<a href="/#" className="pagination-page">
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
