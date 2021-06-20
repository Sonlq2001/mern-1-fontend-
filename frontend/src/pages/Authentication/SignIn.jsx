import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// import { signIn } from "./../../redux/actions/authenticationAction";
import userApi from "./../../api/userApi";
import InPutField from "./../../customField/InputField";
import Loading from "./../../components/Loading";
import Layout from "./Layout";
import { authenticate } from "./index";

const SignIn = (props) => {
	const history = useHistory();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<>
				<Layout title="Đăng nhập">
					<Formik
						initialValues={{
							email: "",
							password: "",
						}}
						onSubmit={async (values) => {
							try {
								const { data } = await userApi.signIn(values);
								setLoading(true);
								authenticate(data, () => {
									history.push("/");
								});
							} catch (error) {
								setLoading(false);
								setError(error.response.data.error);
							}
						}}
						validationSchema={Yup.object().shape({
							email: Yup.string()
								.email("Trường này phải là Email !")
								.required("Vui lòng nhập Email !"),
							password: Yup.string().required(
								"Vui lòng nhập mật khẩu !"
							),
						})}
					>
						{(props) => {
							return (
								<>
									<Form className="form-input">
										{error && (
											<div className="fs-4 alert alert-danger">
												{error}
											</div>
										)}
										<InPutField
											label="Email"
											classLabel="form-group__label"
											type="text"
											className="form-group__input"
											name="email"
											placeholder="VD: sonel@gmail.com"
										/>

										<InPutField
											label="Mật khẩu"
											classLabel="form-group__label"
											type="password"
											className="form-group__input"
											name="password"
											placeholder="Mật khẩu"
											// show={true}
										/>

										<div className="form-group">
											<button className="btn-accept">
												Đăng nhập
											</button>
										</div>

										<div className="form-forgot-pwd">
											<a href="/#" className="forgot-pwd">
												Quên mật khẩu
											</a>
										</div>
									</Form>
								</>
							);
						}}
					</Formik>
				</Layout>
			</>
		);
	}
};

// SignIn.propTypes = {

// }

export default SignIn;
