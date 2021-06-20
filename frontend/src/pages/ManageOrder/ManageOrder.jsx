import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import FrameContent from "../../components/ActionUser/FrameContent";

import { fetchOrder } from "./../../redux/actions/orderAction";
import { fetchProduct } from "./../../redux/actions/productAction";
import { fetchOrderDetail } from "./../../redux/actions/orderDetailAction";

import Loading from "./../../components/Loading";
import { isAuthenticated } from "./../Authentication/index";
const ManageOrder = ({
	listOrder,
	fetchOrder,
	listProduct,
	fetchProduct,
	listOrderDetail,
	fetchOrderDetail,
}) => {
	const { user } = isAuthenticated();
	useEffect(() => {
		fetchOrder();
		fetchProduct();
		fetchOrderDetail();
	}, []);

	const { data: dataProduct } = listProduct;
	const { data: dataOrder, loading } = listOrder;
	const { data: dataOrderDetail } = listOrderDetail;

	if (user) {
		if (loading) {
			return <Loading />;
		} else if (dataOrder.length > 0) {
			let listOrdered = [];
			dataOrder.forEach((order) => {
				const listOrderDetail = dataOrderDetail.filter(
					(orderDetail) => {
						return (
							orderDetail.orderId === order._id &&
							order.userId === user._id
						);
					}
				);

				if (listOrderDetail.length >= 1) {
					let totalPrice = 0;
					for (let orderItem of listOrderDetail) {
						totalPrice += orderItem.unitPrice * orderItem.quantity;
					}

					// lấy trạng thái
					const statusOrder = listOrderDetail.map(
						(orderDetail) => orderDetail.status
					);

					// lấy ra tên
					const listName = [];
					listOrderDetail.forEach((orderDetail) => {
						const productOrder = dataProduct.map((product) => {
							if (product._id === orderDetail.prdId) {
								return {
									name: product.name,
								};
							}
						});
						// loại bỏ giá trị undefined
						const result = productOrder.filter(
							(prd) => prd !== undefined
						);
						listName.push(...result);
					});
					// console.log(listName);

					let mixOrder = {
						_id: order._id,
						timeOrder: order.createdAt,
						totalProduct: listName,
						totalPrice,
						status: statusOrder[0],
					};

					listOrdered.push(mixOrder);
				}
			});

			return (
				<>
					<FrameContent title="Đơn hàng của tôi">
						<table className="table-ordered">
							<thead>
								<tr>
									<th>Mã đơn hàng</th>
									<th>Ngày mua</th>
									<th>Sản phẩm</th>
									<th>Tổng tiền</th>
									<th>Trạng thái đơn hàng</th>
								</tr>
							</thead>
							<tbody>
								{listOrdered.map((order) => {
									let statusOrder;
									switch (order.status) {
										case 1:
											statusOrder = "Chờ xác nhận";
											break;
										case 2:
											statusOrder = "Chờ lấy hàng";
											break;
										case 3:
											statusOrder = "Đang giao hàng";
											break;
										case 4:
											statusOrder =
												"Giao hàng thành công";
											break;
										default:
											statusOrder = "Đang xử lý";
											break;
									}

									if (order.totalProduct.length > 0) {
										let nameProduct;
										if (order.totalProduct.length === 1) {
											nameProduct = `${order.totalProduct[0].name}`;
										} else {
											nameProduct = `${
												order.totalProduct[0].name
											} ... và ${
												order.totalProduct.length - 1
											} sản phẩm nữa.`;
										}

										const codeOrder = order._id.substr(
											0,
											10
										);
										return (
											<tr key={order._id}>
												<td>
													<Link
														to={`/order/view/${order._id}`}
														className="client-view-order"
													>
														{codeOrder}
													</Link>
												</td>
												<td>
													{moment(
														order.timeOrder
													).format("DD/MM/YYYY")}
												</td>
												<td>{nameProduct}</td>
												<td>
													{order.totalPrice
														.toString()
														.replace(
															/\B(?=(\d{3})+(?!\d))/g,
															"."
														)}
													₫
												</td>
												<td>{statusOrder}</td>
											</tr>
										);
									}
								})}
							</tbody>
						</table>
					</FrameContent>
				</>
			);
		} else {
			return <div>Chưa có đơn hàng nào</div>;
		}
	} else {
		return <div>khôn có gì</div>;
	}
};

const mapStateToProps = (state) => {
	return {
		listOrder: state.orders,
		listProduct: state.products,
		listOrderDetail: state.ordersDetail,
	};
};

const mapActionToProps = {
	fetchOrder,
	fetchProduct,
	fetchOrderDetail,
};

export default connect(mapStateToProps, mapActionToProps)(ManageOrder);
