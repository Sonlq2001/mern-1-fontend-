import React from "react";

import banner_sub_1 from "./../../assets/images/banner-sub-1.jpg";

const RowBanner = (props) => {
	return (
		<>
			<div className="model-banner">
				<div className="row">
					<div className="col col-lg-4 col-md-6">
						<a href="/#" className="model-banner-path">
							<img
								src={banner_sub_1}
								alt=""
								className="model-banner-path__img"
							/>
						</a>
					</div>
					<div className="col col-lg-4 col-md-6">
						<a href="/#" className="model-banner-path">
							<img
								src={banner_sub_1}
								alt=""
								className="model-banner-path__img"
							/>
						</a>
					</div>
					<div className="col col-lg-4">
						<a href="/#" className="model-banner-path banner-end">
							<img
								src={banner_sub_1}
								alt=""
								className="model-banner-path__img"
							/>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default RowBanner;
