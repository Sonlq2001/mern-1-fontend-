import React, { useState } from "react";
// import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setCheckbox } from "./../../redux/actions/subCategoryAction";

const TableSubCategory = ({
	subCategories,
	categories,
	handleRemove,
	setCheckbox,
}) => {
	const [listCheckbox, setListCheckbox] = useState([]);
	const handleCheckbox = (id) => {
		const findIndex = listCheckbox.indexOf(id);
		if (findIndex > -1) {
			listCheckbox.splice(findIndex, 1);
		} else {
			setListCheckbox([...listCheckbox, id]);
		}
	};

	return (
		<table className="table table-bordered mt-5">
			<thead>
				<tr>
					<th scope="col">
						<input type="checkbox" />
					</th>
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
							<th scope="row">
								<input
									type="checkbox"
									onChange={() => handleCheckbox(subCate._id)}
								/>
							</th>
							<th scope="row">{index + 1}</th>
							<td>
								<b>{nameCate}</b>
							</td>
							<td>{subCate.name}</td>

							<td>
								<Link
									to={`/admin/action-subcategory/${subCate._id}`}
									className="btn btn-primary me-3 fs-5"
								>
									Sửa
								</Link>
								<button
									onClick={() => handleRemove(subCate._id)}
									className="btn btn-danger fs-5"
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

const mapActionToProps = {
	setCheckbox,
};

export default connect(null, mapActionToProps)(TableSubCategory);
