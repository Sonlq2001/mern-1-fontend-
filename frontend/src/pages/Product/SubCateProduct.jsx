import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchProduct } from "../../redux/actions/productAction";
import { fetchCategory } from "../../redux/actions/categoryAction";
import { fetchSubCategory } from "../../redux/actions/subCategoryAction";
import { addToCart } from "./../../redux/actions/cartAction";

import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading";
import HeaderProductCate from "./HeaderProductCate";
import { isAuthenticated } from "./../../pages/Authentication/index";

const SubCateProduct = ({
	listProduct,
	listCategory,
	listSubCate,
	fetchProduct,
	fetchCategory,
	fetchSubCategory,
	addToCart,
}) => {
	const { id, type } = useParams();
	useEffect(() => {
		fetchProduct();
		fetchCategory();
		fetchSubCategory();
	}, []);

	const { data, loading } = listProduct;
	const { data: dataCate } = listCategory;
	const { data: dataSubCate } = listSubCate;

	if (loading) {
		return <Loading />;
	} else if (data.length > 0) {
		const { user } = isAuthenticated();
		const subCate = dataSubCate.find((subCate) => subCate.name === type);
		const nameCategory = dataCate.find((cate) => cate._id === id);
		const listData = data.filter(
			(product) =>
				product.cateId === id && product.subCateId === subCate._id
		);
		return (
			<>
				<div className="main bgr">
					<div className="container">
						<div className="all-product">
							<HeaderProductCate
								nameCate={nameCategory}
								nameSubCate={type}
							/>
							<div className="row mt-5">
								{listData.map((product) => {
									return (
										<div
											className="col col-lg-2 col-md-4 col-sm-6 col-6"
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
														Giá bán:{" "}
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

							<Pagination />
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return null;
	}
};

const mapStateToProps = (state) => {
	return {
		listProduct: state.products,
		listCategory: state.categories,
		listSubCate: state.subCategories,
	};
};

const mapActionToProps = {
	fetchProduct,
	fetchCategory,
	fetchSubCategory,
	addToCart,
};

export default connect(mapStateToProps, mapActionToProps)(SubCateProduct);
