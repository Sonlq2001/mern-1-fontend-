import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { signIn } from "./../../redux/actions/authenticationAction";
import logo from "./../../assets/images/logo.png";
import banner_header from "./../../assets/images/top-header.jpg";
import { signOut, isAuthenticated } from "./../../pages/Authentication/index";

const Header_top = (props) => {
	const history = useHistory();
	// const [status, setStatus] = useState(false);
	// const user = JSON.parse(localStorage.getItem("user"));
	// useEffect(() => {
	// 	if (user) {
	// 		setStatus(true);
	// 	}
	// }, []);
	const result = isAuthenticated();
	const { pathName } = useLocation();
	const [isLogged, setIsLogged] = useState(false);
	useEffect(() => {
		isAuthenticated() && setIsLogged(true);
	}, [pathName, isLogged]);

	return (
		<>
			<header className="header">
				<div className="header-top">
					<Link to="/">
						<img src={logo} alt="" className="header-top_logo" />
					</Link>
				</div>

				<div className="header-mid">
					<img
						src={banner_header}
						alt=""
						className="header-mid__img"
					/>

					<div className="header-contact">
						<div className="header-contact__box">
							<span className="header-contact__box-label">
								Tổng đài - CSKH
							</span>
							<span className="header-contact__box-phone">
								0225.3 666 555
							</span>
						</div>

						<div className="header-contact__box">
							<span className="header-contact__box-label">
								Kinh doanh:
							</span>
							<span className="header-contact__box-phone">
								0225.3 666 555
							</span>
							<div>
								<span className="header-contact__box-label">
									Kỹ thuật:
								</span>
								<span className="header-contact__box-phone">
									0225.3 666 555
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="header-right">
					<div className="header-notifi">
						<i className="fas fa-bell"></i>
						<span className="header-notifi__count">0</span>
					</div>

					{isLogged && (
						<div className="toggle-box">
							{result.user.name}
							<ul className="action-user">
								{result.user.role == 1 && (
									<li>
										<Link to="/admin">
											Quản trị website
										</Link>
									</li>
								)}
								<li>
									<a
										href="#"
										onClick={() =>
											signOut(() => {
												setIsLogged(false);
												history.push("/");
											})
										}
									>
										Đăng xuất
									</a>
								</li>
							</ul>
						</div>
					)}

					{!isLogged && (
						<div className="header-login">
							<Link to="/sign-in" className="header-login__link">
								Đăng nhập
							</Link>
						</div>
					)}
				</div>
			</header>
		</>
	);
};

// Header_top.propTypes = {};

export default Header_top;
