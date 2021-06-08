import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { fetchProduct } from "./../../redux/actions/productAction";
import product_1 from "./../../assets/images/product-1.jpg";

const DetailRight = ({ product }) => {
	const {
		products: { data },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProduct());
	}, [dispatch]);

	return (
		<>
			<div className="col col-lg-3">
				<div className="product-same">
					<h4 className="product-same__title">
						<i className="icon-same-prd fas fa-bars"></i>
						Sản phẩm cùng loại
					</h4>

					<div className="list-same">
						{data.map((product, index) => {
							if (index < 4) {
								return (
									<div className="box-same" key={product._id}>
										<img
											src={`http://localhost:4000/api/product/img/${product._id}`}
											alt=""
											className="box-same__img"
										/>
										<div className="box-same__content">
											<h5 className="box-same__content-title">
												{product.name}
											</h5>
											<span className="box-same__content-price">
												Giá :{" "}
												{product.price
													.toString()
													.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														"."
													)}
											</span>
										</div>
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
		</>
	);
};

// DetailRight.propTypes = {

// }

export default DetailRight;
