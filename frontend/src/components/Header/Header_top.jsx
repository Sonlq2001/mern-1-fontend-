import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { fetchCategory } from "./../../redux/actions/categoryAction";
import { fetchSubCategory } from "./../../redux/actions/subCategoryAction";
import { clearCart } from "./../../redux/actions/cartAction";

import logo from "./../../assets/images/logo.png";
import closeNav from "./../../assets/images/cancel.png";
import banner_header from "./../../assets/images/top-header.jpg";
import { signOut, isAuthenticated } from "./../../pages/Authentication/index";
import Loading from "./../../components/Loading";

const Header_top = ({
	listCategory,
	listSubCategory,
	fetchCategory,
	fetchSubCategory,
	clearCart,
}) => {
	const history = useHistory();
	const result = isAuthenticated();
	const { pathname } = useLocation();
	const [isLogged, setIsLogged] = useState(false);
	useEffect(() => {
		isAuthenticated() && setIsLogged(true);
	}, [pathname, isLogged]);

	// lấy dữ liệu danh mục
	useEffect(() => {
		fetchCategory();
		fetchSubCategory();
	}, []);
	const { data: dataCategory, loading } = listCategory;
	const { data: dataSubCategory } = listSubCategory;

	// toggle sub menu
	const [selected, setSelected] = useState(null);
	const toggleSubMenu = (id) => {
		if (id === selected) {
			return setSelected(null);
		}
		setSelected(id);
	};

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

					<div className="header-contact ">
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
							{/* <i className="fas fa-user-circle toggle-box__icon-login"></i> */}
							<span className="toggle-box__user">
								{result.user.name}
							</span>
							<ul className="action-user">
								{result.user.role === 1 && (
									<li>
										<Link
											to="/admin"
											className="action-user__path"
										>
											Quản trị website
										</Link>
									</li>
								)}
								<li>
									<Link
										to="/customer/account"
										className="action-user__path"
									>
										Tài khoản của tôi
									</Link>
								</li>
								<li>
									<Link
										to="/order/history"
										className="action-user__path"
									>
										Đơn mua
									</Link>
								</li>
								<li>
									<a
										href="/#"
										className="action-user__path"
										onClick={() =>
											signOut(() => {
												setIsLogged(false);
												clearCart();
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

				{/* menu mobile */}
				<div className="quantity-cart d-lg-none">
					<span className="quantity-cart__num">0</span>
					<i className="quantity-cart__icon fas fa-shopping-cart"></i>
				</div>

				<div className="group-mobile d-lg-none">
					<label
						htmlFor="check-mobile"
						className="group-mobile__hbs "
					>
						<i className=" fas fa-bars"></i>
					</label>
					<input
						type="checkbox"
						id="check-mobile"
						hidden
						className="active-mobile"
					/>

					<label htmlFor="check-mobile" className="overlay"></label>
					<nav className="nav-mobile">
						<label htmlFor="check-mobile" className="header-nav">
							<img
								src={logo}
								alt=""
								className="header-nav__logo"
							/>
							<img
								src={closeNav}
								alt=""
								className="header-nav__close"
							/>
						</label>
						<ul className="list-menu-mobile">
							{dataCategory.length > 0 &&
								dataCategory.map((cate) => {
									return (
										<li
											className="list-menu__item"
											key={cate._id}
											onClick={() =>
												toggleSubMenu(cate._id)
											}
										>
											<div className="box-item">
												<a
													href=""
													className="box-item__link"
												>
													{cate.name}
												</a>
												<div>
													<i className="icon-sub fas fa-chevron-right"></i>
												</div>
											</div>
											<ul
												className={`sub-mobile ${
													selected === cate._id
														? "active"
														: ""
												}`}
											>
												{dataSubCategory.length > 0 &&
													dataSubCategory.map(
														(subCate) => {
															if (
																subCate.cateId ===
																cate._id
															) {
																return (
																	<li
																		className="sub-mobile__item"
																		key={
																			subCate._id
																		}
																	>
																		<a href="">
																			{
																				subCate.name
																			}
																		</a>
																	</li>
																);
															} else {
																return false;
															}
														}
													)}
											</ul>
										</li>
									);
								})}
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		listCategory: state.categories,
		listSubCategory: state.subCategories,
	};
};

const mapActionToProps = {
	fetchCategory,
	fetchSubCategory,
	clearCart,
};

export default connect(mapStateToProps, mapActionToProps)(Header_top);
