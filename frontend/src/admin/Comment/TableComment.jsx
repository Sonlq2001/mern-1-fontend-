import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const TableComment = ({ data }) => {
	return (
		<>
			<table className="table table-bordered mt-4">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Tên sản phẩm</th>
						<th scope="col">Số lượng</th>
						<th scope="col">Thời gian</th>
						<th scope="col">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{data.map((cmt) => {
						if (cmt !== undefined) {
							return (
								<tr key={cmt._id}>
									<td></td>
									<td>{cmt.name}</td>
									<td>{cmt.quantity}</td>
									<td>
										{moment(cmt.time).format(
											"HH:MM DD/MM/YYYY"
										)}
									</td>
									<td>
										<Link
											to={`/admin/comment/${cmt._id}`}
											className="btn btn-primary fs-5"
										>
											Chi tiết
										</Link>
									</td>
								</tr>
							);
						} else {
							return false;
						}
					})}
				</tbody>
			</table>
		</>
	);
};

// TableComment.propTypes = {

// }

export default TableComment;
