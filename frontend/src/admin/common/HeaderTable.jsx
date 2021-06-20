import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const HeaderTable = ({
	title,
	path,
	handleSearch,
	handleSelect,
	data,
	trash,
}) => {
	return (
		<div className="row bg-white pt-3">
			<h4 className="page-title mb-2 ">{title && title}</h4>

			{trash && (
				<div className="col col-lg-12 fs-4 text-end mb-4">
					<i className="fas fa-trash-alt"></i>
					(0)
				</div>
			)}

			<div className="col col-lg-2">
				<input
					type="text"
					className="form-control fs-5"
					placeholder="Tìm kiếm"
					onChange={handleSearch && handleSearch}
				/>
			</div>
			{data && (
				<div className="col col-lg-2">
					<select
						className="form-select fs-5"
						aria-label="Default select example"
						onChange={handleSelect && handleSelect}
					>
						<option value="">Lọc theo danh mục</option>
						{data.map((cate) => {
							return (
								<option key={cate._id} value={cate._id}>
									{cate.name}
								</option>
							);
						})}
					</select>
				</div>
			)}

			<div className={`col text-end ${data ? "col-lg-8" : "col-lg-10"}`}>
				<Link to={path && path} className="btn btn-info fs-5">
					<i className="fas fa-plus"></i>Thêm
				</Link>
			</div>
		</div>
	);
};

export default HeaderTable;
