import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { fetchProduct } from "./../../redux/actions/productAction";
import DetailTop from "./DetailTop";
import DetailOverview from "./DetailOverview";
import Loading from "./../../components/Loading";

const ProductDetail = ({ listProduct, fetchProduct }) => {
	// window.scroll(0, 0);
	const { id } = useParams();
	useEffect(() => {
		fetchProduct(id);
	}, []);

	const { data, loading } = listProduct;

	if (loading) {
		return <Loading />;
	} else {
		const detailProduct = data.find((prd) => prd._id === id);
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
										{detailProduct.name}
									</li>
								</ul>
							</div>

							<DetailTop product={detailProduct} />
							<DetailOverview product={detailProduct} />
						</div>
					</div>
				</div>
			</>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		listProduct: state.products,
	};
};

const mapActionToProps = {
	fetchProduct,
};

export default connect(mapStateToProps, mapActionToProps)(ProductDetail);
