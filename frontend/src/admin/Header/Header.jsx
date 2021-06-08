import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = (props) => {
	return (
		<>
			<header className="topbar" data-navbarbg="skin5">
				<nav className="navbar top-navbar navbar-expand-md navbar-dark">
					<div className="navbar-header" data-logobg="skin5">
						<a className="navbar-brand" href="index.html">
							{/* Logo icon */}
							<b className="logo-icon ps-2">
								{/*You can put here icon as well // <i class="wi wi-sunset"></i> //*/}
								{/* Dark Logo icon */}
								<img
									src="../../assets/images/logo-icon.png"
									alt="homepage"
									className="light-logo"
								/>
							</b>
							{/*End Logo icon */}
							{/* Logo text */}
							<span className="logo-text">
								{/* dark Logo text */}
								<img
									src="../../assets/images/logo-text.png"
									alt="homepage"
									className="light-logo"
								/>
							</span>
						</a>

						<Link
							className="nav-toggler waves-effect waves-light d-block d-md-none"
							to=""
						>
							<i className="ti-menu ti-close" />
						</Link>
					</div>

					<div
						className="navbar-collapse collapse"
						id="navbarSupportedContent"
						data-navbarbg="skin5"
					>
						<ul className="navbar-nav float-start me-auto">
							<li className="nav-item d-none d-lg-block">
								<Link
									to=""
									className="nav-link sidebartoggler waves-effect waves-light"
									data-sidebartype="mini-sidebar"
								>
									<i className="mdi mdi-menu font-24" />
								</Link>
							</li>
							{/* ============================================================== */}
							{/* create new */}
							{/* ============================================================== */}
							<li className="nav-item dropdown">
								<Link
									to=""
									className="nav-link dropdown-toggle"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<span className="d-none d-md-block">
										Create New{" "}
										<i className="fa fa-angle-down" />
									</span>
									<span className="d-block d-md-none">
										<i className="fa fa-plus" />
									</span>
								</Link>
								<ul
									className="dropdown-menu"
									aria-labelledby="navbarDropdown"
								>
									<li>
										<a className="dropdown-item" href="#">
											Action
										</a>
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Another action
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Something else here
										</a>
									</li>
								</ul>
							</li>
							{/* ============================================================== */}
							{/* Search */}
							{/* ============================================================== */}
							<li className="nav-item search-box">
								{" "}
								<Link
									className="nav-link waves-effect waves-dark"
									to=""
								>
									<i className="ti-search" />
								</Link>
								<form className="app-search position-absolute">
									<input
										type="text"
										className="form-control"
										placeholder="Search & enter"
									/>{" "}
									<a className="srh-btn">
										<i className="ti-close" />
									</a>
								</form>
							</li>
						</ul>
						{/* ============================================================== */}
						{/* Right side toggle and nav items */}
						{/* ============================================================== */}
						<ul className="navbar-nav float-end">
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<img
										src="../../assets/images/users/1.jpg"
										alt="user"
										className="rounded-circle"
										width={31}
									/>
								</a>
								<ul
									className="dropdown-menu dropdown-menu-end user-dd animated"
									aria-labelledby="navbarDropdown"
								>
									<Link className="dropdown-item" to="">
										<i className="ti-user me-1 ms-1" />
										My Profile
									</Link>
									<Link className="dropdown-item" to="">
										<i className="ti-wallet me-1 ms-1" />
										My Balance
									</Link>
									<Link className="dropdown-item" to="">
										<i className="ti-email me-1 ms-1" />
										Inbox
									</Link>
									<div className="dropdown-divider" />
									<Link className="dropdown-item" to="">
										<i className="ti-settings me-1 ms-1" />{" "}
										Account Setting
									</Link>
									<div className="dropdown-divider" />
									<Link className="dropdown-item" to="">
										<i className="fa fa-power-off me-1 ms-1" />{" "}
										Logout
									</Link>
									<div className="dropdown-divider" />
									<div className="ps-4 p-10">
										<Link
											className="btn btn-sm btn-success btn-rounded text-white"
											to=""
										>
											View Profile
										</Link>
									</div>
								</ul>
							</li>
							{/* ============================================================== */}
							{/* User profile and search */}
							{/* ============================================================== */}
						</ul>
					</div>
				</nav>
			</header>
		</>
	);
};

// Header.propTypes = {

// }

export default Header;
