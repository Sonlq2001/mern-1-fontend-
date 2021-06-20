import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import HeaderTable from "./../common/HeaderTable";
import TableOrder from "./TableOrder";

import { fetchOrder } from "./../../redux/actions/orderAction";
import { fetchOrderDetail } from "./../../redux/actions/orderDetailAction";
import Loading from "./../../components/Loading";
import NotFoundAdmin from "./../common//NotFoundAdmin";

const ListOrder = ({
	listOrder,
	listOrderDetail,
	fetchOrder,
	fetchOrderDetail,
}) => {
	const [valueSearch, setValueSearch] = useState("");
	// lấy dữ liệu từ trong global state
	useEffect(() => {
		fetchOrder();
		fetchOrderDetail();
	}, []);

	const { data: dataOrder, loading } = listOrder;
	const { data: dataOrderDetail } = listOrderDetail;

	if (loading) {
		return <Loading />;
	} else if (dataOrder.length > 0 && dataOrderDetail.length > 0) {
		const listOrdered = [];
		dataOrder.forEach((order) => {
			const listOrderDetail = dataOrderDetail.filter(
				(orderDetail) => orderDetail.orderId === order._id
			);

			// tính số tiền sản phẩm và số lượng
			let totalPay = 0;
			let totalQuantity = 0;
			for (let orderDetail of listOrderDetail) {
				totalPay += orderDetail.unitPrice * orderDetail.quantity;
				totalQuantity += orderDetail.quantity;
			}

			let ordered = {
				_id: order._id,
				name: order.name,
				totalQuantity,
				totalPay,
				timeOrder: order.createdAt,
				status: listOrderDetail[0].status,
			};

			listOrdered.push(ordered);
		});

		// filter
		const handleSearch = (e) => setValueSearch(e.target.value);
		const listFilter = listOrdered.filter((order) =>
			order.name.toLowerCase().includes(valueSearch.toLowerCase())
		);

		return (
			<>
				<HeaderTable
					title="Danh sách đơn hàng"
					path="/admin/order"
					handleSearch={handleSearch}
					trash={true}
				/>
				<div className="row bg-white fs-5">
					<div className="col col-lg-12">
						<TableOrder listOrdered={listFilter} />
					</div>
				</div>
			</>
		);
	} else {
		return <NotFoundAdmin />;
	}
};

const mapStateToProps = (state) => {
	return {
		listOrder: state.orders,
		listOrderDetail: state.ordersDetail,
	};
};

const mapActionToProps = {
	fetchOrder,
	fetchOrderDetail,
};

export default connect(mapStateToProps, mapActionToProps)(ListOrder);
