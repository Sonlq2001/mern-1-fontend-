import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCart } from "./../../redux/actions/cartAction";
import { isAuthenticated } from "./../../pages/Authentication/index";

function Navbar_header({ listCart, fetchCart }) {
	const history = useHistory();
	const { pathname } = useLocation();
	const [navbar, setNavbar] = useState(false);
	const [showNav, setShowNav] = useState(false);

	// handle search
	const [keySearch, setKeySearch] = useState("");
	const handleOnChang = (e) => {
		setKeySearch(e.target.value.toLowerCase().trim());
	};
	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (keySearch === "") {
			return false;
		} else {
			history.push(`/search/${keySearch}`);
		}
	};

	// handle sticky header
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.innerWidth >= 992) {
				if (window.scrollY >= 70) {
					setNavbar(true);
				} else {
					setNavbar(false);
				}
			} else {
				setNavbar(false);
			}

			if (window.scrollY >= 430 && pathname === "/") {
				setShowNav(true);
			} else if (window.scrollY >= 0 && pathname !== "/") {
				setShowNav(true);
			} else {
				setShowNav(false);
			}
		});
	}, [navbar, pathname, showNav]);

	// show total cart
	const { user } = isAuthenticated();
	useEffect(() => {
		fetchCart();
	}, []);
	const { cart } = listCart;
	let totalCart = 0;
	if (user) {
		if (cart.length > 0) {
			for (let cartProduct of cart) {
				if (cartProduct.userId === user._id) {
					totalCart += cartProduct.quantity;
				}
			}
		}
	}

	return (
		<>
			<div className={`nav-group ${navbar ? "sticky" : null} `}>
				<div className="container">
					<nav className="nav-header">
						<div className={`nav-cate ${showNav ? "active" : ""}`}>
							<i className="nav-cate__icon fas fa-bars"></i>
							<span className="nav-cate__txt">
								DANH MỤC SẢN PHẨM
							</span>

							<ul className="list-menu list-move">
								<li className="item-menu">
									<a href="" className="path-menu">
										<img
											src="http://localhost:4000/api/category/img/60b7328a2339642f646afe2a"
											alt=""
											className="img-menu"
										/>
										danh mục
									</a>
									<ul className="sub-menu">
										<li className="sub-menu__item">
											<a
												href=""
												className="link-sub-menu"
											>
												asdf
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>

						<div className="nav-hot">
							<marquee behavior="" direction="">
								Chương trình khyến mãi
							</marquee>
						</div>

						<div className="nav-group-search">
							<form
								className="nav-search"
								onSubmit={handleOnSubmit}
							>
								<input
									type="text"
									placeholder="Tìm kiếm"
									className="nav-search__input"
									value={keySearch}
									onChange={handleOnChang}
								/>
								<span className="nav-search__span">
									<i className="nav-search__icon fas fa-search"></i>
								</span>
							</form>
							<Link to="/card" className="nav-card">
								<i className="fas fa-shopping-cart"></i>
								{user && (
									<span className="nav-card__total">
										({totalCart})
									</span>
								)}

								{!user && (
									<span className="nav-card__total">(0)</span>
								)}
							</Link>
							{/* <div className="nav-login">
							<a href="">Đăng nhập</a>
						</div> */}
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		listCart: state.carts,
	};
};

const mapActionToProps = {
	fetchCart,
};
export default connect(mapStateToProps, mapActionToProps)(Navbar_header);
