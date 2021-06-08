import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
	fetchProduct,
	removeProduct,
} from "./../../redux/actions/productAction";
import { fetchCategory } from "./../../redux/actions/categoryAction";

import TableProduct from "./TableProduct";
import Loading from "./../../components/Loading";
const ListProduct = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { products, categories } = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchProduct());
		dispatch(fetchCategory());
	}, [dispatch]);

	const { data, loading } = products;
	const { data: listCate } = categories;

	if (loading) {
		return <Loading loading_admin="loading-admin" />;
	} else if (data.length > 0) {
		const handleRemove = async (id) => {
			if (window.confirm("Bạn thật sự muốn xóa ?")) {
				dispatch(removeProduct(id));
			}
		};
		return (
			<>
				<div className="row bg-white pt-3">
					<h4 className="page-title mb-4">Danh sách sản phẩm</h4>

					<div className="row">
						<div className="col col-lg-2">
							<input
								type="text"
								className="form-control "
								placeholder="Tìm kiếm"
							/>
						</div>
						<div className="col col-lg-2">
							{/* <select
								className="form-select"
								aria-label="Default select example"
								value={""}
							>
								<option value="" selected>
									Xắp xếp theo
								</option>
								<option key={1} value={1}>
									One
								</option>
							</select> */}
						</div>
						<div className="col col-lg-8 text-end">
							<Link
								to="/admin/add-product"
								className="btn btn-info"
							>
								<i className="fas fa-plus"></i>Thêm
							</Link>
						</div>
					</div>
				</div>
				<div className="row bg-white">
					<div className="col col-lg-12">
						{/* <div className="card-body">
							<h5 className="card-title mb-0">Static Table</h5>
						</div> */}

						<TableProduct
							products={data}
							categories={listCate}
							handleRemove={handleRemove}
						/>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<img src="https://hanbaby.vn/wp-content/uploads/2020/12/no-product.jpg" />
		);
	}
};

// ListProduct.propTypes = {

// }

export default ListProduct;
