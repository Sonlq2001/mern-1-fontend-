import React from "react";
// import PropTypes from "prop-types";
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
					</div>
				</nav>
			</header>
		</>
	);
};

// Header.propTypes = {

// }

export default Header;
