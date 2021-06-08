import React from "react";
import PropTypes from "prop-types";

const TableCart = (props) => {
	const { disable } = props;

	return (
		<>
			<table className="table-card">
				<thead>
					<tr>
						<th>Ảnh sản phẩm</th>
						<th>Tên sản phẩm</th>
						<th>Đơn giá</th>
						<th>SL</th>
						<th>Thành tiền</th>
						{disable && <th>Xóa</th>}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>ádbf</td>
						<td>ádbf</td>
						<td>ádbf</td>
						<td>
							<div className="count-total">
								{disable && (
									<button className="btn">
										<i className="fas fa-minus"></i>
									</button>
								)}
								{disable ? (
									<input
										type="number"
										value="1"
										className="count-total__num"
									/>
								) : (
									<input
										type="number"
										value="1"
										className="count-total__num"
										disabled
									/>
								)}
								{disable && (
									<button className="btn">
										<i className="fas fa-plus"></i>
									</button>
								)}
							</div>
						</td>
						<td>ádbf</td>
						{disable && (
							<td>
								<button className="">Xóa</button>
							</td>
						)}
					</tr>
				</tbody>
			</table>
		</>
	);
};

// TableCart.propTypes = {

// }

export default TableCart;
