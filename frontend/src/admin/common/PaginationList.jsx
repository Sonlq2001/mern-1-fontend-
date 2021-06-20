import React from "react";
// import PropTypes from 'prop-types'

const PaginationList = ({
	limit,
	total,
	paginate,
	minus,
	plus,
	currentPage,
}) => {
	const pageNumbers = [];
	const totalPage = Math.ceil(total / limit);
	for (let i = 1; i <= totalPage; i++) {
		pageNumbers.push(i);
	}
	return (
		<>
			<nav aria-label="Page navigation example">
				<ul className="pagination fs-5 mt-4">
					{currentPage > 1 && (
						<li className="page-item" onClick={() => minus()}>
							<span className="page-link" aria-label="Previous">
								<span aria-hidden="true">«</span>
							</span>
						</li>
					)}

					{pageNumbers.map((page) => {
						return (
							<li
								className={`page-item ${
									page === currentPage ? "active" : ""
								}`}
								key={page}
								onClick={() => paginate(page)}
							>
								<span className="page-link">{page}</span>
							</li>
						);
					})}

					{currentPage < totalPage && (
						<li className="page-item" onClick={() => plus()}>
							<span className="page-link" aria-label="Next">
								<span aria-hidden="true">»</span>
							</span>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
};

export default PaginationList;
