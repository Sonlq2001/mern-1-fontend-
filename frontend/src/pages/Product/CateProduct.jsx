import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchProduct } from "../../redux/actions/productAction";
import { fetchCategory } from "../../redux/actions/categoryAction";
import { addToCart } from "./../../redux/actions/cartAction";

import Pagination from "../../components/Pagination/Pagination";
import HeaderProductCate from "./HeaderProductCate";
import Loading from "../../components/Loading";
import { isAuthenticated } from "./../../pages/Authentication/index";

const CateProduct = ({
	listProduct,
	listCategory,
	fetchProduct,
	fetchCategory,
	addToCart,
}) => {
	const { id } = useParams();
	const [currentPage, setCurrentPage] = useState(1);

	const limit = 1;
	const indexOfLast = currentPage * limit;
	const indexOfFirst = indexOfLast - limit;
	useEffect(() => {
		fetchProduct();
		fetchCategory();
	}, []);
	const { data, loading } = listProduct;
	const { data: dataCategory } = listCategory;

	if (loading) {
		return <Loading />;
	} else if (data.length > 0) {
		const { user } = isAuthenticated();
		const listData = data.filter((product) => product.cateId === id);
		const nameCategory = dataCategory.find((cate) => cate._id === id);

		// const currentProduct = listData.slice(indexOfFirst, indexOfLast);

		// const paginate = (pageNumber) => {
		// 	setCurrentPage(pageNumber);
		// };

		return (
			<div className="main bgr">
				<div className="container">
					<div className="all-product">
						<HeaderProductCate nameCate={nameCategory} />
						<div className="row mt-4">
							{listData.map((product) => {
								return (
									<div
										className="col col-lg-2 col-md-4 mt-4 col-sm-6 col-6"
										key={product._id}
									>
										<div
											className="box-product"
											// onMouseMove={handleHover}
											// onMouseOut={(e) => setLocation({ isFlag: false })}
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
													Giá bán: {""}
													{product.price
														.toString()
														.replace(
															/\B(?=(\d{3})+(?!\d))/g,
															"."
														)}
													<sup>đ</sup>
												</span>
											</div>
											{user && (
												<button
													className="box-card"
													onClick={() =>
														addToCart(
															product._id,
															user._id,
															product.price
														)
													}
												>
													<i className="box-card__icon fas fa-cart-plus"></i>
													<span className="box-card__card">
														Thêm vào giỏ
													</span>
												</button>
											)}

											{!user && (
												<Link
													to="/sign-in"
													className="box-card"
												>
													<i className="box-card__icon fas fa-cart-plus"></i>
													<span className="box-card__card">
														Thêm vào giỏ
													</span>
												</Link>
											)}
										</div>
									</div>
								);
							})}
						</div>

						<Pagination
						// productPerPage={limit}
						// total={listData.length}
						// paginate={paginate}
						/>
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

const mapStateToProps = (state) => {
	return {
		listProduct: state.products,
		listCategory: state.categories,
	};
};

const mapActionToProps = {
	fetchProduct,
	fetchCategory,
	addToCart,
};

export default connect(mapStateToProps, mapActionToProps)(CateProduct);
