import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { fetchProduct, findProduct } from "./../../redux/actions/productAction";
import productApi from "./../../api/productApi";
import DetailTop from "./DetailTop";
import DetailOverview from "./DetailOverview";
import Loading from "./../../components/Loading";

const ProductDetail = (props) => {
	// window.scroll(0, 0);
	const { id } = useParams();
	const {
		detailProduct: { data, loading },
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(findProduct(id));
	}, [dispatch]);

	if (loading) {
		return <Loading />;
	} else {
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
										{data.name}
									</li>
								</ul>
							</div>

							<DetailTop product={data} />
							<DetailOverview product={data} />
						</div>
					</div>
				</div>
			</>
		);
	}
};

// ProductDetail.propTypes = {

// }

export default ProductDetail;
