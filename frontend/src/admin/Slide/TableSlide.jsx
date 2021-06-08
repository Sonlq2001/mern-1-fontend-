import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import EmptyTable from "./../EmptyTable";
import Loading from "./../../components/Loading";
const TableSlide = ({ data, handleRemove }) => {
	return (
		<>
			<table className="table table-bordered mt-4">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Ảnh</th>
						<th scope="col">Đường dẫn liên kết</th>
						<th scope="col">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{data.map((slide, index) => (
						<tr key={slide._id}>
							<th scope="row">{index + 1}</th>
							<td>
								<img
									src={`http://localhost:4000/api/slide/img/${slide._id}`}
									alt=""
									className="img-slide"
									width="64px"
									height="64px"
								/>
							</td>
							<td>{slide.path}</td>
							<td>
								<Link
									to={`/admin/edit-slide/${slide._id}`}
									className="btn btn-primary me-3"
								>
									Sửa
								</Link>
								<button
									className="btn btn-danger"
									onClick={() => handleRemove(slide._id)}
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

// TableSlide.propTypes = {

// }

export default TableSlide;
