import React from "react";
// import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const TabletCategory = ({ data, handleRemove }) => {
	return (
		<>
			<table className="table table-bordered mt-4">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Ảnh</th>
						<th scope="col">Tên danh mục</th>
						<th scope="col">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{data.map((cate, index) => (
						<tr key={index}>
							<th scope="row">{index + 1}</th>
							<td>
								<img
									src={`http://localhost:4000/api/category/img/${cate._id}`}
									alt=""
									className="img-cate"
									width="64px"
									height="64px"
									style={{ backgroundColor: "#aaa" }}
								/>
							</td>
							<td>{cate.name}</td>
							<td>
								<Link
									to={`/admin/edit-category/${cate._id}`}
									className="btn btn-primary me-3 fs-5"
								>
									Sửa
								</Link>
								<button
									className="btn btn-danger fs-5"
									onClick={() => handleRemove(cate._id)}
								>
									Xóa
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

// TabletCategory.propTypes = {

// }

export default TabletCategory;
