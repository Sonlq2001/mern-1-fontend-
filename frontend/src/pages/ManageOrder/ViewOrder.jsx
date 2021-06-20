import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import { fetchOrder } from "./../../redux/actions/orderAction";
import { fetchOrderDetail } from "./../../redux/actions/orderDetailAction";
import { fetchProduct } from "./../../redux/actions/productAction";

import { isAuthenticated } from "./../../pages/Authentication/index";
import FrameContent from "../../components/ActionUser/FrameContent";
import Loading from "./../../components/Loading";
const ViewOrder = ({
	listOrder,
	listOrderDetail,
	listProduct,
	fetchOrder,
	fetchOrderDetail,
	fetchProduct,
}) => {
	const { id } = useParams();
	const { user } = isAuthenticated();
	useEffect(() => {
		fetchOrder();
		fetchOrderDetail();
		fetchProduct();
	}, []);

	const { data: dataOrder, loading } = listOrder;
	const { data: dataOrderDetail } = listOrderDetail;
	const { data: dataProduct } = listProduct;

	if (user) {
		if (loading) {
			return <Loading />;
		} else if (dataOrder.length >= 0) {
			const userOrder = dataOrder.find(
				(order) => order.userId === user._id && order._id === id
			);

			let transport = "";
			if (userOrder.payment === 0) {
				transport = "Thanh toán tiền mặt khi nhận hàng";
			} else if (userOrder.payment === 1) {
				transport = "Thanh toán bằng thẻ quốc tế";
			} else if (userOrder.payment === 2) {
				transport =
					"Thẻ ATM nội địa/Internet Banking (Miễn phí thanh toán)";
			}

			// lấy ra sản phẩm theo order user
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
					};
				});

				listProductOrder.push(...mixOrderDetail);
			});

			let totalPay = 0;

			// component
			const rowInfo = (
				<div className="row mt-4 g-3">
					<div className="col col-lg-12 mb-3">
						<div className="text-end fs-5">
							Thời gian đặt hàng:{" "}
							{moment(userOrder.createdAt).format(
								"HH:MM DD / MM / YYYY"
							)}
						</div>
					</div>
					<div className="col col-lg-4">
						<h4 className="title-order">Địa chỉ người nhận</h4>
						<div className="box-info-order">
							<h4 className="box-info-order__user">
								{userOrder.name}
							</h4>
							<div className="box-info-detail">
								<span className="box-info-detail__label">
									Địa chỉ:
								</span>
								<span className="box-info-detail__content">
									{userOrder.address}
								</span>
							</div>
							<div className="box-info-detail">
								<span className="box-info-detail__label">
									Điện thoại
								</span>
								<span className="box-info-detail__content">
									{userOrder.phone}
								</span>
							</div>
						</div>
					</div>

					<div className="col col-lg-4">
						<h4 className="title-order">Hình thức vận chuyển</h4>
						<div className="box-info-order">Chưa có thông tin</div>
					</div>

					<div className="col col-lg-4">
						<h4 className="title-order">Hình thức thanh toán</h4>
						<div className="box-info-order">
							<div className="box-info-detail">
								<span className="box-info-detail__content">
									{transport}
								</span>
							</div>
						</div>
					</div>
				</div>
			);

			return (
				<>
					<FrameContent title="Chi tiết đơn hàng" component={rowInfo}>
						<table className="table-product">
							<thead>
								<tr>
									<th>Sản phẩm</th>
									<th>Giá</th>
									<th>Số lượng</th>
									<th>Giảm giá</th>
									<th>Tạm tính</th>
								</tr>
							</thead>
							<tbody>
								{listProductOrder.map((order) => {
									let sale;
									let priceReal;
									if (order.sale !== null) {
										sale = order.sale;
										priceReal =
											((100 - order.sale) / 100) *
											order.price *
											order.quantity;
									} else {
										sale = 0;
										priceReal =
											order.price * order.quantity;
									}
									totalPay += priceReal;
									return (
										<tr key={order._id}>
											<td>
												<div className="product-item">
													<img
														src={`http://localhost:4000/api/product/img/${order._id}`}
														alt=""
														className="product-item__img"
													/>
													<div className="product-info">
														<p className="product-info__name">
															{order.name}
														</p>
														<Link
															to="/"
															className="product-info__path"
														>
															Mua lại
														</Link>
													</div>
												</div>
											</td>
											<td>
												{order.price
													.toString()
													.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														"."
													)}{" "}
												₫{" "}
											</td>
											<td>{order.quantity}</td>
											<td>{sale} %</td>
											<td>
												{priceReal
													.toString()
													.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														"."
													)}{" "}
												₫
											</td>
										</tr>
									);
								})}
							</tbody>
							<tfoot>
								<tr>
									<td colSpan={4}>
										<div className="total-pay">
											Tổng cộng
										</div>
									</td>
									<td>
										{totalPay &&
											totalPay
												.toString()
												.replace(
													/\B(?=(\d{3})+(?!\d))/g,
													"."
												)}{" "}
										₫
									</td>
								</tr>
							</tfoot>
						</table>
					</FrameContent>
				</>
			);
		} else {
			return <div>Chưa có đơn hàng nào</div>;
		}
	} else {
		return <div>Không có gì hết</div>;
	}
};

const mapStateToProps = (state) => {
	return {
		listOrder: state.orders,
		listOrderDetail: state.ordersDetail,
		listProduct: state.products,
	};
};

const mapActionToProps = {
	fetchOrder,
	fetchOrderDetail,
	fetchProduct,
};

export default connect(mapStateToProps, mapActionToProps)(ViewOrder);
