import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import { fetchUser, updateUserClient } from "./../../redux/actions/userActions";
import FrameContent from "../../components/ActionUser/FrameContent";
import { isAuthenticated } from "./../Authentication/index";
import InputField from "./../../customField/InputField";
import Loading from "./../../components/Loading";
const Account = ({ listUser, fetchUser, updateUserClient }) => {
	const [checkbox, setCheckbox] = useState(false);
	const { user } = isAuthenticated();

	useEffect(() => {
		fetchUser();
	}, []);

	const { data, loading, success, error } = listUser;

	if (user) {
		if (loading) {
			return <Loading />;
		} else {
			const infoUser = data.find(
				(userLogin) => userLogin._id === user._id
			);

			const initialValues = {
				name: infoUser.name,
				email: infoUser.email,
				password: "",
				password_new: "",
			};

			return (
				<>
					<FrameContent title="Thông tin tài khoản">
						<Formik
							initialValues={initialValues}
							validationSchema={Yup.object().shape({
								name: Yup.string().required(
									"Vui lòng nhập tên của bạn !"
								),
								email: Yup.string()
									.email("Email không chính xác !")
									.required("Vui lòng nhập email của bạn !"),
								password: Yup.string()
									.required("Vui lòng nhập password cũ !")
									.min(6),
								password_new: Yup.string()
									.required("Vui lòng nhập password mới !")
									.min(6),
							})}
							onSubmit={(values) => {
								updateUserClient(user._id, values);
							}}
						>
							{() => {
								return (
									<Form className="form-info">
										<InputField
											label="Họ tên"
											classLabel="label-form"
											type="text"
											className="input-form"
											id="name"
											name="name"
											value=""
											classError="err-account"
										/>
										<InputField
											label="Email"
											classLabel="label-form"
											type="email"
											className="input-form"
											id="email"
											name="email"
											value=""
											classError="err-account"
										/>

										<div className="form-group">
											<input
												type="checkbox"
												className="checkbox-change"
												id="checkbox-change"
												onChange={() =>
													setCheckbox(!checkbox)
												}
											/>
											<span className="fake-checkbox"></span>
											<label
												htmlFor="checkbox-change"
												className="label-check"
											>
												Thay đổi mật khẩu
											</label>
										</div>

										{success && (
											<div
												className="msg-client-update alert alert-success d-flex align-items-center"
												role="alert"
											>
												<div className="ms-3">
													Cập nhập tài khoản thành
													công !
												</div>
											</div>
										)}

										{error && !success && (
											<div
												className="msg-client-update alert alert-danger d-flex align-items-center"
												role="alert"
											>
												<i className="fas fa-exclamation-circle"></i>
												<div className="ms-3">
													{error}
												</div>
											</div>
										)}

										{checkbox && (
											<>
												<InputField
													label="Mật khẩu cũ"
													classLabel="label-form"
													type="password"
													className="input-form"
													id="password"
													name="password"
													value=""
													placeholder="Nhập mật khẩu cũ"
													classError="err-account"
												/>

												<InputField
													label="Mật khẩu mới"
													classLabel="label-form"
													type="password"
													className="input-form"
													id="password-new"
													name="password_new"
													value=""
													placeholder="Nhập mật khẩu mới"
													classError="err-account"
												/>
											</>
										)}

										<div className="form-group">
											<button className="btn btn-confirm">
												Cập nhập
											</button>
										</div>
									</Form>
								);
							}}
						</Formik>
					</FrameContent>
				</>
			);
		}
	} else {
		return <div>làm gì có</div>;
	}
};

const mapStateToProps = (state) => {
	return {
		listUser: state.users,
	};
};

const mapActionToProps = {
	fetchUser,
	updateUserClient,
};

export default connect(mapStateToProps, mapActionToProps)(Account);
