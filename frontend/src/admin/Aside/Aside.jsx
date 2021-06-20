import React from "react";
// import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const Aside = (props) => {
	return (
		<>
			<aside className="left-sidebar" data-sidebarbg="skin5">
				{/* Sidebar scroll*/}
				<div className="scroll-sidebar">
					{/* Sidebar navigation*/}
					<nav className="sidebar-nav">
						<ul id="sidebarnav" className="pt-4">
							<li className="sidebar-item">
								<Link
									to="/admin"
									className="sidebar-link waves-effect waves-dark sidebar-link"
									aria-expanded="false"
								>
									<i className="fas fa-tachometer-alt"></i>
									<span className="hide-menu">Dashboard</span>
								</Link>
							</li>
							<li className="sidebar-item">
								<Link
									to="/admin/category"
									className="sidebar-link waves-effect waves-dark sidebar-link"
									aria-expanded="false"
								>
									<i className="fas fa-project-diagram"></i>
									<span className="hide-menu">Category</span>
								</Link>
							</li>
							<li className="sidebar-item">
								<Link
									to="/admin/subcategory"
									className="sidebar-link waves-effect waves-dark sidebar-link"
									aria-expanded="false"
								>
									<i className="fas fa-project-diagram"></i>
									<span className="hide-menu">
										Sub Category
									</span>
								</Link>
							</li>
							<li className="sidebar-item">
								<Link
									to="/admin/product"
									className="sidebar-link waves-effect waves-dark sidebar-link"
									aria-expanded="false"
								>
									<i className="fas fa-gift"></i>
									<span className="hide-menu">Product</span>
								</Link>
							</li>
							<li className="sidebar-item">
								<Link
									to="/admin/slide"
									className="sidebar-link waves-effect waves-dark sidebar-link"
									aria-expanded="false"
								>
									<i className="far fa-images"></i>
									<span className="hide-menu">Slide</span>
								</Link>
							</li>
							<li className="sidebar-item">
								<Link
									to="/admin/comment"
									className="sidebar-link waves-effect waves-dark sidebar-link"
									aria-expanded="false"
								>
									<i className="fas fa-comments"></i>
									<span className="hide-menu">Comment</span>
								</Link>
							</li>
							<li className="sidebar-item">
								<Link
									to="/admin/user"
									className="sidebar-link waves-effect waves-dark sidebar-link"
									aria-expanded="false"
								>
									<i className="fas fa-users-cog"></i>
									<span className="hide-menu">User</span>
								</Link>
							</li>
							<li className="sidebar-item">
								<Link
									to="/admin/order"
									className="sidebar-link waves-effect waves-dark sidebar-link"
									aria-expanded="false"
								>
									<i className="fas fa-cart-arrow-down"></i>
									<span className="hide-menu">Order</span>
								</Link>
							</li>
						</ul>
					</nav>
					{/* End Sidebar navigation */}
				</div>
				{/* End Sidebar scroll*/}
			</aside>
		</>
	);
};

// Aside.propTypes = {

// }

export default Aside;
