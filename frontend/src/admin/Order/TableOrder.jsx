import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
	fetchOrderDetail,
	updateOrderDetail,
} from "./../../redux/actions/orderDetailAction";

const TableOrder = ({
	listOrdered,
	listOrderDetail,
	fetchOrderDetail,
	updateOrderDetail,
}) => {
	const [status, setStatus] = useState(false);
	useEffect(() => {
		fetchOrderDetail();
	}, []);

	const { data: dataOrderDetail, loading } = listOrderDetail;

	// remove order
	const removeOrder = (id) => {
		const ordered = dataOrderDetail.filter(
			(orderDetail) => orderDetail.orderId === id
		);

		const idsRemove = ordered.map((orderDetail) => {
			return {
				orderId: orderDetail.orderId,
			};
		});
		console.log(idsRemove);
	};

	// update status
	const updateStatus = (id) => {
		setStatus(true);
		updateOrderDetail(id);
	};

	return (
		<>
			<table className="table table-bordered mt-4">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Tên người đặt</th>
						<th scope="col">Số lượng</th>
						<th scope="col">Tổng tiền</th>
						<th scope="col">Thời gian</th>
						<th scope="col">Trạng thái</th>
						<th scope="col" colSpan="2">
							Thao tác
						</th>
					</tr>
				</thead>
				<tbody>
					{listOrdered.map((order, index) => {
						let statusOrder = "";
						let classStatus = "";

						switch (order.status) {
							case 1:
								statusOrder = "Xác nhận";
								classStatus = "status-1 ";
								break;
							case 2:
								statusOrder = "Chờ lấy hàng";
								classStatus = "status-2 ";
								break;
							default:
								statusOrder = "Xác nhận";
								break;
						}

						return (
							<tr key={order._id}>
								<td>{index + 1}</td>
								<td>{order.name}</td>
								<td>{order.totalQuantity}</td>
								<td>
									{order.totalPay
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
									<sup>đ</sup>
								</td>
								<td>
									{moment(order.timeOrder).format(
										"HH:MM DD/MM/YYYY"
									)}
								</td>
								<td
									className={`confirm-order ${classStatus}`}
									onClick={() => updateStatus(order._id)}
								>
									{statusOrder}
								</td>
								<td>
									{order.status === 1 && (
										<button
											className="btn btn-danger"
											onClick={() =>
												removeOrder(order._id)
											}
										>
											Xóa
										</button>
									)}
								</td>
								<td>
									<Link
										to={`/admin/order/${order._id}`}
										className="btn btn-primary"
									>
										Chi tiết
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		listOrderDetail: state.ordersDetail,
	};
};

const mapActionToProps = {
	fetchOrderDetail,
	updateOrderDetail,
};

export default connect(mapStateToProps, mapActionToProps)(TableOrder);
