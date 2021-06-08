import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProduct } from "./../../redux/actions/productAction";
import Loading from "./../../components/Loading";

const RowList = ({ category }) => {
	const {
		products: { data },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProduct());
	}, [dispatch]);

	const [location, setLocation] = useState({
		top: 0,
		left: 0,
	});

	if (data.length > 0) {
		// lấy ra sản phẩm theo danh mục
		const listProduct = data.filter((prd) => prd.cateId == category._id);

		const handleHover = (e) => {
			const x = e.clientX - 60;
			const y = e.clientY - 60;
			setLocation({
				top: `${y}px`,
				left: `${x}px`,
			});
		};

		return (
			<div className="model-product">
				<div className="row">
					{listProduct.map((product, index) => {
						if (index <= 5) {
							return (
								<div className="col col-lg-2" key={product._id}>
									<div
										className="box-product"
										// onMouseMove={(e) => handleHover(e)}
									>
										<h2 className="box-product__name">
											<Link
												to={`/product/${product._id}`}
											>
												{product.name}
											</Link>
										</h2>
										<div className="box-body">
											<div className="box-body__img">
												<img
													src={`http://localhost:4000/api/product/img/${product._id}`}
													alt=""
												/>
											</div>
											<span className="box-body__price">
												Giá bán :
												{product.price
													.toString()
													.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														"."
													)}
												<sup>đ</sup>
											</span>
										</div>
										<button className="box-card">
											<i className="box-card__icon fas fa-cart-plus"></i>
											<span className="box-card__card">
												Thêm vào giỏ
											</span>
										</button>

										<div
											className={`box-detail`}
											style={location}
										>
											<h3 className="box-detail__name">
												{product.name}
											</h3>
											<span className="box-detail__price">
												{product.price
													.toString()
													.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														"."
													)}
											</span>
											<div className="box-detail__status">
												Còn hàng
											</div>
											<ul className="list-detail">
												<li className="list-detail__item">
													Intel® Core™ i5-4300U
												</li>
												<li className="list-detail__item">
													Intel® Core™ i5-4300U
												</li>
												<li className="list-detail__item">
													Intel® Core™ i5-4300U
												</li>
												<li className="list-detail__item">
													Intel® Core™ i5-4300U
												</li>
											</ul>
										</div>
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>
		);
	} else {
		return <Loading />;
	}
};

RowList.propTypes = {};

export default RowList;
