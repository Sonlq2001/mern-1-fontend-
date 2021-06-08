import React, { useState } from "react";
import PropTypes from "prop-types";

const DetailConfig = ({ product }) => {
	// handle price sale
	let newPrice;
	if (product.sale === null) {
		newPrice = product.price;
	} else {
		newPrice = ((100 - product.sale) / 100) * product.price;
	}

	// handle change counter
	const [valueCounter, setValueCounter] = useState(1);

	const handleMinus = () => {
		setValueCounter(valueCounter - 1);
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setValueCounter(value);
	};

	const handlePlus = () => {
		setValueCounter(valueCounter + 1);
	};

	return (
		<>
			<div className="col col-lg-5">
				<div className="detail-config">
					<h3 className="detail-config__title">{product.name}</h3>
					<div className="box-price">
						<span className="box-price__new">
							{newPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
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
						Bảo hành :
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
						<input
							type="number"
							className="counter__number"
							value={valueCounter}
							onChange={handleChange}
						/>
						<button
							className="btn-counter counter__plus"
							onClick={handlePlus}
						>
							<i className="fas fa-plus"></i>
						</button>
					</div>

					<div
						dangerouslySetInnerHTML={{
							__html: product.description,
						}}
					></div>
					{/* <ul className="list-config">
						<li className="list-config__item">
							Cpu: core I5-4300U Processor ( 3M cache, upto
							2.90Ghz)
						</li>
						<li className="list-config__item">
							Ram: 4Gb dung lượng bộ nhớ bus 1600.
						</li>
						<li className="list-config__item">
							SSD : 128Gb tốc độ truy xuất cực nhanh.
						</li>
					</ul> */}

					<button className="btn-buy">
						<span className="btn-buy__title">mua ngay</span>
						<span className="btn-buy__des">
							Giao tận nơi hoặc nhận tại siêu thị
						</span>
					</button>
				</div>
			</div>
		</>
	);
};

// DetailConfig.propTypes = {

// }

export default DetailConfig;
