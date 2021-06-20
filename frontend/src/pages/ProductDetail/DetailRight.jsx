import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "./../../redux/actions/productAction";

const DetailRight = ({ product, listProduct, fetchProduct }) => {
	const { id } = useParams();

	useEffect(() => {
		fetchProduct();
	}, []);
	const { data } = listProduct;

	const listProductSame = data.filter(
		(prd) => prd.cateId === product.cateId && prd._id !== id
	);
	return (
		<>
			<div className="col col-lg-3 col-md-12 col-sm-12 col-12">
				<div className="product-same">
					<h4 className="product-same__title">
						<i className="icon-same-prd fas fa-bars"></i>
						Sản phẩm cùng loại
					</h4>

					<div className="list-same">
						{listProductSame.map((product, index) => {
							if (index < 4) {
								return (
									<div className="box-same" key={product._id}>
										<img
											src={`http://localhost:4000/api/product/img/${product._id}`}
											alt=""
											className="box-same__img"
										/>
										<div className="box-same__content">
											<Link
												to={`/product/${product._id}`}
												className="box-same__content-title fs-5"
											>
												{product.name}
											</Link>
											<span className="box-same__content-price">
												Giá :{" "}
												{product.price
													.toString()
													.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														"."
													)}{" "}
												<sup>đ</sup>
											</span>
										</div>
									</div>
								);
							} else {
								return false;
							}
						})}
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		listProduct: state.products,
	};
};

export default connect(mapStateToProps, { fetchProduct })(DetailRight);
