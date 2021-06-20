import React from "react";
import { NavLink } from "react-router-dom";

const NavbarCustomer = () => {
	return (
		<ul className="action-customer">
			<li className="action-customer__item">
				<NavLink
					to="/customer/account"
					className="action-customer-path"
					activeClassName="active-action"
				>
					<i className="fas fa-user-alt"></i>
					Thông tin tài khoản
				</NavLink>
			</li>
			<li className="action-customer__item">
				<NavLink
					to="/order/history"
					className="action-customer-path"
					activeClassName="active-action"
				>
					<i className="fas fa-book-open"></i>
					Quản lý đơn hàng
				</NavLink>
			</li>
		</ul>
	);
};

export default NavbarCustomer;
