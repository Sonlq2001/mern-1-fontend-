import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchProduct } from "../../redux/actions/productAction";
import { fetchCategory } from "../../redux/actions/categoryAction";
import { fetchSubCategory } from "../../redux/actions/subCategoryAction";

import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading";

const SubCateProduct = (props) => {
	const { id, type } = useParams();

	// lấy dữ liệu từ trong store
	const {
		products: { data, loading },
		categories: { data: listCate },
		subCategories: { data: listSubCate },
	} = useSelector((state) => state);

	// nạp dữ liệu
	useEffect(() => {
		dispatch(fetchProduct());
		dispatch(fetchCategory());
		dispatch(fetchSubCategory());
	}, []);

	const dispatch = useDispatch();

	if (loading) {
		return <Loading />;
	} else if (data.length > 0) {
		const subCate = listSubCate.find((subCate) => subCate.name == type);

		const listData = data.filter(
			(product) =>
				product.cateId === id && product.subCateId === subCate._id
		);

		const nameCategory = listCate.find((cate) => cate._id === id);

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
										{nameCategory.name}
									</li>
									<span className="break">/</span>
									<li className="breadcrumb-list__item">
										{type}
									</li>
								</ul>

								<div className="control-box">
									<div className="sort-price">
										<div className="sort-price__title">
											<span>Giá:</span>
											<i className="fas fa-chevron-down"></i>
										</div>
										<div className="sort-price__sub">
											<span className="ascending">
												Giá: Thấp đến cao
											</span>
											<span className="decrease">
												Giá: Cao đến thấp
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="row mt-5">
								{listData.map((product) => {
									return (
										<div
											className="col col-lg-2"
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
														Giá bán :{product.price}
													</span>
												</div>
												<button className="box-card">
													<i className="box-card__icon fas fa-cart-plus"></i>
													<span className="box-card__card">
														Thêm vào giỏ
													</span>
												</button>
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

// CateProduct.propTypes = {

// }

export default SubCateProduct;
