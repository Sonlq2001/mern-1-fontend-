import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import { fetchCart, removeCart } from "./../../redux/actions/cartAction";
import orderApi from "./../../api/orderApi";
import orderDetailApi from "./../../api/orderDetailApi";
import cartApi from "./../../api/cartApi";
import { isAuthenticated } from "./../Authentication/index";

import InputField from "./../../customField/InputField";
import SelectField from "./../../customField/SelectField";
import RadioField from "./../../customField/RadioField";

import paymentLive from "./../../assets/images/payment-live.svg";
import paymentVisa from "./../../assets/images/payment-visa.svg";
import paymentAtm from "./../../assets/images/payment-atm.svg";

import Loading from "./../../components/Loading";
import CartNotFound from "./CartNotFound";

const capitals = [
	{
		value: "1",
		label: "Hà nội",
	},
	{
		value: "2",
		label: "Hồ chí minh",
	},
];

const FormPay = ({ listCart, fetchCart, removeCart }) => {
	useEffect(() => {
		fetchCart();
	}, []);
	const { user } = isAuthenticated();
	const { cart } = listCart;

	return (
		<>
			<Formik
				initialValues={{
					name: "",
					phone: "",
					capital: "",
					address: "",
					payment: "0",
				}}
				onSubmit={async (values) => {
					values.userId = user._id;
					try {
						// lưu vào trong order
						const { data } = await orderApi.add(values);
						if (data) {
							if (cart.length > 0) {
								// lấy các sản phẩm của user đã order
								const cartUser = cart.filter((itemCart) => {
									return itemCart.userId === user._id;
								});

								// lưu dữ liệu vào trong order detail
								const orderDetail = cartUser.map((cart) => {
									return {
										orderId: data._id,
										userId: cart.userId,
										prdId: cart.prdId,
										quantity: cart.quantity,
										unitPrice: cart.price,
										status: 1,
									};
								});
								const result = await orderDetailApi.add(
									orderDetail
								);
								if (result) {
									// xóa bỏ sp trong giỏ
									cartUser.forEach((itemCart) => {
										cartApi.remove(itemCart._id);
										removeCart(itemCart._id);
									});

									alert(
										"Đặt hàng thành công !, Cảm ơn quý khách đã đặt hàng !"
									);
								}
							}
						}
					} catch (error) {}
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required(
						"Vui lòng nhập tên người nhận !"
					),
					phone: Yup.string().required(
						"Vui lòng điền số diện thoại !"
					),
					capital: Yup.string().required("Vui lòng chọn thành phố !"),
					address: Yup.string().required(
						"Vui lòng điện địa chỉ nhận hàng !"
					),
				})}
			>
				{() => {
					return (
						<>
							<h3 className="group-pay-title">
								Điền thông tin người nhận
							</h3>
							<Form className="row">
								<div className="col col-lg-6">
									<div className="form-pay">
										<InputField
											label="Tên người nhận"
											classLabel="form-field__label"
											type="text"
											name="name"
											id="name"
											placeholder="Tên người nhận"
											className="form-field__input"
										/>
										<InputField
											label="Số điện thoại"
											classLabel="form-field__label"
											type="text"
											name="phone"
											id="phone"
											placeholder="Điện thoại"
											className="form-field__input"
										/>
										<SelectField
											label="Thành phố"
											classLabel="form-field__label"
											name="capital"
											options={capitals}
										/>
									</div>
								</div>

								<div className="col col-lg-6">
									<div className="form-pay">
										<InputField
											label="Địa chỉ"
											classLabel="form-field__label"
											type="text"
											name="address"
											id="address"
											placeholder="Địa chỉ"
											className="form-field__input"
										/>
										<RadioField
											label="Thanh toán tiền mặt khi nhận hàng"
											classLabel="label-payment"
											type="radio"
											name="payment"
											id="payment"
											className="input-payment"
											value="0"
											element={
												<>
													<img
														src={paymentLive}
														className="img-payment"
													/>
													<div className="fake-radio"></div>
												</>
											}
										/>

										<RadioField
											label="Thanh toán bằng thẻ quốc tế"
											classLabel="label-payment"
											type="radio"
											name="payment"
											value="1"
											className="input-payment"
											id="payment1"
											element={
												<>
													<img
														src={paymentVisa}
														className="img-payment"
													/>
													<div className="fake-radio"></div>
												</>
											}
										/>

										<RadioField
											label="Thẻ ATM nội địa/Internet Banking (Miễn phí thanh toán)"
											classLabel="label-payment"
											type="radio"
											name="payment"
											value="2"
											className="input-payment"
											id="payment2"
											element={
												<>
													<img
														src={paymentAtm}
														className="img-payment"
													/>
													<div className="fake-radio"></div>
												</>
											}
										/>
									</div>
								</div>

								<div className="col col-lg-12">
									<div className="group-btn">
										<button className="confirm-pay">
											<i className="far fa-paper-plane"></i>
											Xác nhận thanh toán
										</button>
									</div>
								</div>
							</Form>
						</>
					);
				}}
			</Formik>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		listCart: state.carts,
	};
};

const mapActionToProps = {
	fetchCart,
	removeCart,
};

export default connect(mapStateToProps, mapActionToProps)(FormPay);
