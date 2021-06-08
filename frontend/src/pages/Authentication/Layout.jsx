import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import icon_google from "./../../assets/images/google.svg";
import icon_facebook from "./../../assets/images/facebook.svg";
import InPutField from "./../../customField/InputField";

const Layout = ({ children, title }) => {
	return (
		<>
			<header className="hd-login">
				<Link to="/" className="hd-login__txt">
					<span className="key-logo">S</span>
					<span className="key-o"></span>
					nel
				</Link>
			</header>
			<div className="container">
				<div className="group-content">
					<div className="form-login">
						<h3 className="form-login__title">{title}</h3>
						<div className="login-fast">
							<button className="btn-google login-social">
								<img
									src={icon_google}
									alt=""
									className="login-social__google"
								/>
								<span className="login-fast__txt">
									Đăng nhập với Google
								</span>
							</button>

							<button className="btn-facebook login-social">
								<img
									src={icon_facebook}
									alt=""
									className="login-social__img"
								/>
								<span className="login-fast__txt">
									Đăng nhập với Facebook
								</span>
							</button>
						</div>
						<p className="form-login__tip">
							Mẹo: Đăng nhập nhanh hơn với Google hoặc Facebook!
						</p>

						<div className="option-login">
							<span className="option-login__txt">Hoặc</span>
						</div>

						{children}
					</div>

					<div className="small-question">
						<span>Bạn chưa có tài khoản?</span>
						<Link to="/sign-up" className="small-question__signup">
							Đăng ký để nhận được những ưu đãi !
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

// SignIn.propTypes = {

// }

export default Layout;
