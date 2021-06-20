import React, { useState } from "react";
import { Formik, Form, resetForm } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import userApi from "./../../api/userApi";
import InputField from "./../../customField/InputField";
import Layout from "./Layout";

const SignUp = (props) => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	return (
		<>
			<Layout title="Đăng ký">
				<Formik
					initialValues={{ name: "", email: "", password: "" }}
					validationSchema={Yup.object().shape({
						name: Yup.string().required(
							"Vui lòng nhập tên của bạn!"
						),
						email: Yup.string()
							.required("Vui lòng nhập email !")
							.email("Địa chỉ email không hợp lệ !"),
						password: Yup.string()
							.min(6)
							.required("Vui lòng nhập mật khẩu !"),
					})}
					onSubmit={async (values, { resetForm }) => {
						try {
							const { data } = await userApi.signUp(values);
							if (data) {
								setSuccess(true);
								resetForm({ values: "" });
							}
						} catch (error) {
							setError(error.response.data.error);
						}
					}}
				>
					{() => {
						return (
							<Form className="form-input">
								{success && (
									<div className="fs-4 alert alert-success">
										Đăng kí tài khoản thành công !
										<Link
											to="/sign-in"
											className="alert-link"
										>
											Đăng nhập
										</Link>
									</div>
								)}
								{error && success === false && (
									<div className="fs-4 alert alert-danger">
										{error}
									</div>
								)}
								<InputField
									label="Họ và tên"
									classLabel="form-group__label"
									type="text"
									name="name"
									id="name"
									placeholder="VD: le quang son"
									className="form-group__input"
								/>

								<InputField
									label="Email"
									classLabel="form-group__label"
									type="text"
									className="form-group__input"
									name="email"
									placeholder="VD: sonel@gmail.com"
								/>

								<InputField
									label="Mật khẩu"
									classLabel="form-group__label"
									type="password"
									name="password"
									placeholder="Mật khẩu"
									className="form-group__input"
								/>

								<div className="form-group">
									<button className="btn-accept">
										Đăng ký
									</button>
								</div>

								<div className="form-forgot-pwd">
									<a href="/#" className="forgot-pwd">
										Quên mật khẩu
									</a>
								</div>
							</Form>
						);
					}}
				</Formik>
			</Layout>
		</>
	);
};

export default SignUp;
