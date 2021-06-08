import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import TableCart from "./TableCart";

const Card = (props) => {
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
								<TableCart disable={true} />
							</div>

							<div className="group-total">
								<div className="header-total">
									<span className="header-total__title">
										Tổng Tiền :
									</span>
									<span className="header-total__price">
										14,750,000
										<sup>đ</sup>
									</span>
								</div>
								<p className="group-total__cost">
									(Giá chưa bao gồm chi phí vận chuyển và các
									khoản chi phí khác - nếu có)
								</p>
								<Link to="/pay" className="group-total__start">
									<i className="fas fa-sign-in-alt"></i>
									<span className="group-pay__start-txt">
										Tiến hành thanh toán
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// Card.propTypes = {

// }

export default Card;
