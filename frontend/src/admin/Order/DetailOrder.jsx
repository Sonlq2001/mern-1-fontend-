import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import { fetchProduct } from "./../../redux/actions/productAction";
import { fetchOrder } from "./../../redux/actions/orderAction";
import { fetchOrderDetail } from "./../../redux/actions/orderDetailAction";
import Loading from "./../../components/Loading";
const DetailOrder = ({
	listProduct,
	listOrder,
	listOrderDetail,
	fetchProduct,
	fetchOrder,
	fetchOrderDetail,
}) => {
	const { id } = useParams();
	useEffect(() => {
		fetchOrder();
		fetchOrderDetail();
		fetchProduct();
	}, []);

	const { data: dataOrder, loading } = listOrder;
	const { data: dataOrderDetail } = listOrderDetail;
	const { data: dataProduct } = listProduct;

	if (loading) {
		return <Loading />;
	} else if (dataOrder.length > 0) {
		// lấy ra user order
		const userOrder = dataOrder.find((order) => order._id === id);
		let payment = "";
		switch (userOrder) {
			case 0:
				payment = "Thanh toán tiền mặt khi nhận hàng";
				break;
			case 1:
				payment = "Thanh toán bằng thẻ quốc tế";
				break;
			case 2:
				payment =
					"Thẻ ATM nội địa/Internet Banking (Miễn phí thanh toán)";
				break;
			default:
				payment = "Thanh toán tiền mặt khi nhận hàng";
		}

		const orderedDetail = dataOrderDetail.filter(
			(orderDetail) => orderDetail.orderId === id
		);
		const listProductOrder = [];
		orderedDetail.forEach((order) => {
			const orderProduct = dataProduct.filter((prd) => {
				return order.prdId === prd._id;
			});
			const mixOrderDetail = orderProduct.map((prd) => {
				return {
					_id: prd._id,
					name: prd.name,
					photo: prd.photo,
					price: prd.price,
					sale: prd.sale,
					quantity: order.quantity,
					status: order.status,
				};
			});

			listProductOrder.push(...mixOrderDetail);
		});

		let totalPay = 0;
		return (
			<>
				<div className="row fs-5">
					<div className="col col-lg-12">
						<div className="card text-dark bg-light mb-3">
							<div className="card-header d-flex justify-content-between">
								<h4>Thông tin đơn hàng</h4>
								<span>
									Thời gian đặt hàng:{" "}
									{moment(userOrder.createdAt).format(
										"HH:MM  DD/MM/YYYY"
									)}
								</span>
							</div>
							<div className="card-body">
								<p className="card-text">
									Người đặt hàng:{" "}
									<span className="card-title fs-4">
										{userOrder.name}
									</span>
								</p>
								<p className="card-text">
									Địa chỉ: {userOrder.address}
								</p>
								<p className="card-text">
									Điện thoại: {userOrder.phone}
								</p>
								<p className="card-text">
									Hình thức vận chuyển: {payment}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="row mt-4">
					<div className="col col-lg-12">
						<div className="card">
							<h4 className="card-header">Chi tiết đơn hàng</h4>
							<table className="table fs-5">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Sản phẩm</th>
										<th scope="col">Số lượng</th>
										<th scope="col">Giá</th>
										<th scope="col">Giảm giá</th>
										<th scope="col">Tạm tính</th>
										<th scope="col">Trạng thái</th>
									</tr>
								</thead>
								<tbody>
									{listProductOrder.map((order) => {
										let sale = 0;
										let priceMoment = 0;
										if (order.sale) {
											sale = order.sale;
											priceMoment =
												((100 - order.sale) / 100) *
												order.quantity *
												order.price;
										} else {
											sale = 0;
											priceMoment =
												order.quantity * order.price;
										}
										let status = "";
										switch (order.status) {
											case 1:
												status = "Chờ xác nhận !";
												break;
											case 2:
												status = "Chờ lấy hàng";
												break;

											default:
												status = "Chờ xác nhận !";
										}

										totalPay += priceMoment;

										return (
											<tr key={order._id}>
												<th scope="row">1</th>
												<td>
													<div className="d-flex">
														<img
															src={`http://localhost:4000/api/product/img/${order._id}`}
															alt=""
															className="me-4"
															style={{
																width: "80px",
																height: "80px",
															}}
														/>
														<div>
															<p className="fs-5 mt-3">
																{order.name}
															</p>
														</div>
													</div>
												</td>
												<td>{order.quantity}</td>
												<td>
													{order.price
														.toString()
														.replace(
															/\B(?=(\d{3})+(?!\d))/g,
															"."
														)}{" "}
													<sup>đ</sup>
												</td>
												<td>{sale} %</td>
												<td>
													{priceMoment
														.toString()
														.replace(
															/\B(?=(\d{3})+(?!\d))/g,
															"."
														)}{" "}
													<sup>đ</sup>
												</td>
												<td>{status}</td>
											</tr>
										);
									})}

									<tr>
										<td colSpan="5" className="text-end">
											Tổng tiền
										</td>
										<td className="">
											{totalPay
												.toString()
												.replace(
													/\B(?=(\d{3})+(?!\d))/g,
													"."
												)}{" "}
											<sup>đ</sup>
										</td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return null;
	}
};

const mapStateToProps = (state) => {
	return {
		listProduct: state.products,
		listOrder: state.orders,
		listOrderDetail: state.ordersDetail,
	};
};

const mapActionToProps = {
	fetchOrder,
	fetchOrderDetail,
	fetchProduct,
};

export default connect(mapStateToProps, mapActionToProps)(DetailOrder);
