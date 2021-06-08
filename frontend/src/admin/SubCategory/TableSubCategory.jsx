import React from "react";
// import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const TableSubCategory = ({ subCategories, categories, handleRemove }) => {
	return (
		<table className="table table-bordered mt-5">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Danh mục cha</th>
					<th scope="col">Danh mục con</th>
					<th scope="col">Thao tác</th>
				</tr>
			</thead>
			<tbody>
				{subCategories.map((subCate, index) => {
					let nameCate = "";
					for (let cate of categories) {
						if (cate._id === subCate.cateId) {
							nameCate = cate.name;
						}
					}

					return (
						<tr key={subCate._id}>
							<th scope="row">{index + 1}</th>
							<td>
								<b>{nameCate}</b>
							</td>
							<td>{subCate.name}</td>

							<td>
								<Link
									to={`/admin/action-subcategory/${subCate._id}`}
									className="btn btn-primary me-3"
								>
									Sửa
								</Link>
								<button
									onClick={() => handleRemove(subCate._id)}
									className="btn btn-danger"
								>
									Xóa
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

// TableSubCategory.propTypes = {

// }

export default TableSubCategory;
