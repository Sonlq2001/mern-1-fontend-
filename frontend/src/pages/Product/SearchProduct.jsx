import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchProduct } from "../../redux/actions/productAction";
import { addToCart } from "../../redux/actions/cartAction";

import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading";
import { isAuthenticated } from "./../../pages/Authentication/index";

const SearchProduct = ({ addToCart }) => {
	const { q } = useParams();
	const dispatch = useDispatch();
	const {
		products: { data, loading },
	} = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchProduct());
	}, [dispatch]);

	if (loading) {
		return <Loading />;
	} else if (data.length > 0) {
		const listData = data.filter(
			(product) => product.name.toLowerCase().indexOf(q) !== -1
		);
		if (listData.length > 0) {
			const { user } = isAuthenticated();
			// add to cart
			const handleAddToCart = (product) => {
				addToCart(product._id, user._id, product.price);
			};

			return (
				<>
					<div className="main bgr">
						<div className="container">
							<div className="all-product">
								<div className="group-control">
									<ul className="breadcrumb-list">
										<li className="breadcrumb-list__item">
											<i className="fas fa-home"></i>Trang
											chủ
										</li>
										<span className="break">/</span>
										<li className="breadcrumb-list__item">
											Tìm kiếm
										</li>
										<span className="break">/</span>
										<li className="breadcrumb-list__item">
											Từ khóa: {q}
										</li>
									</ul>
									<span className="counter-search">
										Tìm thấy: {listData.length} sản phẩm
									</span>
								</div>
								<div className="row mt-5">
									{listData.map((product) => {
										return (
											<div
												className="col col-lg-2 mt-3"
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
																handleAddToCart(
																	product
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
			return (
				<div className="not-found-search">
					<p className="text-not-found">
						Không tìm thấy kết quả tìm kiếm: "{" "}
						<span className="result-search">{q}</span> "
					</p>
					<img
						src="https://media.istockphoto.com/vectors/page-concept-not-found-search-result-icon-vector-id833475304?k=6&m=833475304&s=170667a&w=0&h=veXD2cLhfBeqJWFARtAgfGSySZf23DIfUcQG_UaDfMo="
						className="not-found-img"
					/>
				</div>
			);
		}
	} else {
		return null;
	}
};

// CateProduct.propTypes = {

// }

export default connect(null, { addToCart })(SearchProduct);
