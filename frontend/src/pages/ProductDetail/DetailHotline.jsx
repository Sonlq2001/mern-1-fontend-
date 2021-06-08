import React from "react";
import PropTypes from "prop-types";

import hotline from "./../../assets/images/hotline.jpg";

const DetailHotline = (props) => {
	return (
		<>
			<div className="col col-lg-3">
				<div className="box-hotline">
					<img src={hotline} alt="" />

					<ul className="list-hotline">
						<h3 className="list-hotline__title">Hỗ trợ bán hàng</h3>
						<li className="item-hotline">
							<i className="item-hotline__icon far fa-clock"></i>
							từ 7:30 đến 21:00
						</li>
						<li className="item-hotline">
							<i className="fas item-hotline__icon fa-fax"></i>
							0225.3 666 555
						</li>
						<li className="item-hotline">
							<i className="item-hotline__icon fas fa-phone-square-alt"></i>
							0943.038 555
						</li>
						<li className="item-hotline">
							<i className="item-hotline__icon fas fa-map-marker-alt"></i>
							7/ 274A Lạch Tray - Ngô Quyền - HP
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

// DetailHotline.propTypes = {

// }

export default DetailHotline;
