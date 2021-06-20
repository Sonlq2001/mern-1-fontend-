import React from "react";
// import PropTypes from "prop-types";

import banner_main1 from "./../../assets/images/banner-main-1.jpg";

const Banner_main = (props) => {
	return (
		<>
			<div className="banner-main">
				<div className="row g-3">
					<div className="col col-lg-6">
						<div className="banner-main">
							<a href="/#">
								<img src={banner_main1} alt="" />
							</a>
						</div>
					</div>
					<div className="col col-lg-6">
						<div className="banner-main">
							<a href="/#">
								<img src={banner_main1} alt="" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// Banner_main.propTypes = {};

export default Banner_main;
