import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "./../../redux/actions/cartAction";
import { isAuthenticated } from "./../../pages/Authentication/index";

const DetailConfig = ({ product, addToCart }) => {
	// handle price sale
	let newPrice;
	if (product.sale === null) {
		newPrice = product.price;
	} else {
		newPrice = ((100 - product.sale) / 100) * product.price;
	}

	// handle change counter
	const [valueCounter, setValueCounter] = useState(1);
	const handleMinus = () => setValueCounter(valueCounter - 1);
	const handlePlus = () => setValueCounter(valueCounter + 1);

	// user
	const { user } = isAuthenticated();
	return (
		<>
			<div className="col col-lg-5 col-md-6 col-sm-12 col-12">
				<div className="detail-config">
					<h3 className="detail-config__title">{product.name}</h3>
					<div className="box-price">
						<span className="box-price__new">
							{newPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
							<sup>đ</sup>
						</span>
						{product.sale && (
							<span className="box-price__old">
								{product.price
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
							</span>
						)}
					</div>
					<div className="guarantee">
						Bảo hành:{" "}
						<span className="guarantee__date">
							{product.guarantee} tháng
						</span>
					</div>

					<div className="counter">
						<button
							className={`btn-counter counter__minus ${
								valueCounter <= 1 ? "disabled" : ""
							}`}
							onClick={handleMinus}
						>
							<i className="fas fa-minus"></i>
						</button>
						<span className="counter__number">{valueCounter}</span>

						<button
							className="btn-counter counter__plus"
							onClick={handlePlus}
						>
							<i className="fas fa-plus"></i>
						</button>
					</div>

					<div
						className="list-config"
						dangerouslySetInnerHTML={{
							__html: product.description,
						}}
					></div>

					{user && (
						<button
							className="btn-buy"
							onClick={() =>
								addToCart(
									product._id,
									user._id,
									product.price,
									valueCounter
								)
							}
						>
							<span className="btn-buy__title">mua ngay</span>
							<span className="btn-buy__des">
								Giao tận nơi hoặc nhận tại siêu thị
							</span>
						</button>
					)}

					{!user && (
						<Link to="/sign-in" className="btn-buy">
							<span className="btn-buy__title">mua ngay</span>
							<span className="btn-buy__des">
								Giao tận nơi hoặc nhận tại siêu thị
							</span>
						</Link>
					)}
				</div>
			</div>
		</>
	);
};

export default connect(null, { addToCart })(DetailConfig);
