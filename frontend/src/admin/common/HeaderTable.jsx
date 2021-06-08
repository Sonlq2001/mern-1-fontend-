import React from "react";
// import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const HeaderTable = ({ title, path }) => {
	return (
		<div className="row bg-white pt-3">
			<h4 className="page-title mb-4">{title}</h4>

			<div className="row">
				<div className="col col-lg-2">
					<input
						type="text"
						className="form-control "
						placeholder="Tìm kiếm"
					/>
				</div>
				<div className="col col-lg-2">
					{/* <select
							className="form-select"
							aria-label="Default select example"
							value={""}
						>
							<option value="" selected>
								Xắp xếp theo
							</option>
							<option key={1} value={1}>
								One
							</option>
						</select> */}
				</div>
				<div className="col col-lg-8 text-end">
					<Link to="/admin/add-category" className="btn btn-info">
						<i className="fas fa-plus"></i>Thêm
					</Link>
				</div>
			</div>
		</div>
	);
};

// HeaderTable.propTypes = {

// }

export default HeaderTable;
