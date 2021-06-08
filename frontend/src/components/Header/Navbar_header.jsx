import React, { useState } from "react";
// import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

function Navbar_header(props) {
	const history = useHistory();
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

	return (
		<>
			<div className="nav-group">
				<div className="container">
					<nav className="nav-header">
						<div className="nav-cate">
							<i className="nav-cate__icon fas fa-bars"></i>
							<span className="nav-cate__txt">
								DANH MỤC SẢN PHẨM
							</span>
						</div>

						<div className="nav-hot">
							<marquee behavior="" direction="">
								Chương trình khyến mãi
							</marquee>
						</div>

						<div className="nav-group">
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
								<span className="nav-card__total">(0)</span>
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

Navbar_header.propTypes = {};

export default Navbar_header;
