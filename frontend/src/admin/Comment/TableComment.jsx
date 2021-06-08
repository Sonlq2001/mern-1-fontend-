import React from "react";
// import PropTypes from 'prop-types'

const TableComment = (props) => {
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
				<tbody></tbody>
			</table>
		</>
	);
};

// TableComment.propTypes = {

// }

export default TableComment;
