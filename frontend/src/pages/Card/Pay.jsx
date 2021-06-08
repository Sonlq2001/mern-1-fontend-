import React from "react";
import PropTypes from "prop-types";

import TableCart from "./TableCart";
import FormPay from "./FormPay";

const Pay = (props) => {
	return (
		<>
			<div className="main bgr">
				<div className="container">
					<div className="all-product">
						<div className="group-control">
							<ul className="breadcrumb-list">
								<li className="breadcrumb-list__item">
									<i className="fas fa-home"></i>Trang chủ
								</li>
								<span className="break">/</span>
								<li className="breadcrumb-list__item">
									Trang chủ
								</li>
							</ul>
						</div>
						<div className="row mt-5">
							<div className="card-group">
								<TableCart disable={false} />
							</div>
						</div>
						<FormPay />
					</div>
				</div>
			</div>
		</>
	);
};

// FormPay.propTypes = {

// }

export default Pay;
