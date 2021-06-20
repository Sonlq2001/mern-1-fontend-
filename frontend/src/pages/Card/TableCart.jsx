import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	fetchCart,
	increase,
	decrease,
	removeCart,
} from "./../../redux/actions/cartAction";
import { fetchProduct } from "./../../redux/actions/productAction";
import { isAuthenticated } from "./../Authentication/index";
import CartNotFound from "./CartNotFound";
import Loading from "./../../components/Loading";

const TableCart = ({
	disable,
	listCart,
	fetchCart,
	listProduct,
	fetchProduct,
	increase,
	decrease,
	removeCart,
}) => {
	useEffect(() => {
		fetchCart();
		fetchProduct();
	}, []);

	const { user } = isAuthenticated();
	const { data } = listProduct;
	const { cart, loading } = listCart;

	// lấy card theo đúng user
	const listCartUser = [];
	cart.forEach((cartItem) => {
		const productCart = data.filter((product) => {
			return (
				product._id === cartItem.prdId && cartItem.userId === user._id
			);
		});

		const mixListCart = productCart.map((product) => {
			return {
				_id: cartItem._id,
				prdId: product._id,
				img: product.photo,
				sale: product.sale,
				name: product.name,
				price: product.price,
				quantity: cartItem.quantity,
			};
		});
		listCartUser.push(...mixListCart);
	});

	if (user) {
		if (loading) {
			return <Loading />;
		} else if (listCartUser.length > 0) {
			let totalPay = 0;
			return (
				<>
					<div className="card-group">
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
								{listCartUser.map((item, index) => {
									let newPrice = 0;
									if (item.sale) {
										newPrice =
											((100 - item.sale) / 100) *
											item.price;
									} else {
										newPrice = item.price;
									}
									totalPay += newPrice * item.quantity;
									return (
										<tr key={index}>
											<td>
												<img
													src={`http://localhost:4000/api/product/img/${item.prdId}`}
													alt=""
													className="img-cart"
												/>
											</td>
											<td>{item.name}</td>
											<td>
												{newPrice
													.toString()
													.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														"."
													)}
												<sup>đ</sup>
											</td>
											<td>
												<div className="count-total">
													{disable && (
														<button
															className={`btn ${
																item.quantity ===
																1
																	? "disabled"
																	: ""
															}`}
															onClick={() =>
																decrease(
																	item._id,
																	item.prdId,
																	user._id,
																	item.quantity
																)
															}
														>
															<i className="fas fa-minus"></i>
														</button>
													)}
													{disable ? (
														<span className="count-total__num">
															{item.quantity}
														</span>
													) : (
														<span className="count-total__num">
															{item.quantity}
														</span>
													)}
													{disable && (
														<button
															className="btn"
															onClick={() =>
																increase(
																	item._id,
																	item.prdId,
																	user._id,
																	item.quantity
																)
															}
														>
															<i className="fas fa-plus"></i>
														</button>
													)}
												</div>
											</td>
											<td>
												{(item.quantity * newPrice)
													.toString()
													.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														"."
													)}
												<sup>đ</sup>
											</td>
											{disable && (
												<td>
													<button
														className="remove-cart"
														onClick={() =>
															removeCart(item._id)
														}
													>
														Xóa
													</button>
												</td>
											)}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>

					<div className="group-total">
						<div className="header-total">
							<span className="header-total__title">
								Tổng Tiền :
							</span>
							<span className="header-total__price">
								{totalPay
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
								<sup>đ</sup>
							</span>
						</div>
						<p className="group-total__cost">
							(Giá chưa bao gồm chi phí vận chuyển và các khoản
							chi phí khác - nếu có)
						</p>
						{disable && (
							<Link to="/pay" className="group-total__start">
								<i className="fas fa-sign-in-alt"></i>
								<span className="group-pay__start-txt">
									Tiến hành thanh toán
								</span>
							</Link>
						)}
					</div>
				</>
			);
		} else {
			return <CartNotFound />;
		}
	} else {
		return <div>Đăng nhập vào rồi mua hàng nhé bạn</div>;
	}
};

const mapStateToProps = (state) => {
	return {
		listCart: state.carts,
		listProduct: state.products,
	};
};

const mapActionToProps = {
	fetchCart,
	fetchProduct,
	increase,
	decrease,
	removeCart,
};

export default connect(mapStateToProps, mapActionToProps)(TableCart);
