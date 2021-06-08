import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Loading from "./../../components/Loading";
import EmptyTable from "./../EmptyTable";
const TableProduct = ({ products, categories, handleRemove }) => {
	return (
		<>
			<table className="table table-bordered mt-5">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Tên</th>
						<th scope="col">Danh mục</th>
						<th scope="col">Ảnh</th>
						<th scope="col">Giá gốc</th>
						<th scope="col">Trạng thái</th>
						<th scope="col">Thao tác</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => {
						let nameCate = "";
						for (let cate of categories) {
							if (cate._id === product.cateId) {
								nameCate = cate.name;
							}
						}
						return (
							<tr key={product._id}>
								<th scope="row">{index + 1}</th>
								<td>{product.name}</td>
								<td>{nameCate}</td>
								<td>
									<img
										src={`http://localhost:4000/api/product/img/${product._id}`}
										alt=""
										className="img-cate"
									/>
								</td>
								<td>
									{product.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
									<sup>đ</sup>
								</td>
								<td>
									<span
										className={`text-white ${
											product.status
												? "bg-success"
												: "bg-danger"
										}`}
									>
										{product.status
											? "Còn hàng"
											: "Hết hàng"}
									</span>
								</td>
								<td>
									<Link
										to={`/admin/edit-product/${product._id}`}
										className="btn btn-primary me-3"
									>
										Sửa
									</Link>
									<button
										onClick={() =>
											handleRemove(product._id)
										}
										className="btn btn-danger"
									>
										Xóa
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

// TableProduct.propTypes = {

// }

export default TableProduct;
