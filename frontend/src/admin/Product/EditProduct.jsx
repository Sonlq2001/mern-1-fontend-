import React, { useEffect } from "react";
import { Formik, Form, FastField, Field } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";

import {
	fetchProduct,
	updateProduct,
} from "./../../redux/actions/productAction";

import InPutField from "./../../customField/InputField";
import SelectField from "./../../customField/SelectField";
import FileField from "./../../customField/FileField";
import TextareaField from "./../../customField/TextareaField";
import CheckboxField from "./../../customField/CheckboxField";
import Loading from "./../../components/Loading";
import {
	GUARANTEE,
	LIST_CATEGORY,
	LIST_SUBCATEGORY,
} from "../../constants/constants";

const EditProduct = ({listProduct, fetchProduct, updateProduct}) => {
	const history = useHistory();
	const { id } = useParams();

	useEffect(() => {
		fetchProduct();
	}, []);

	const {data: dataProduct, loading} = listProduct;
	if (loading) {
		return <Loading loading_admin="loading-admin"/>;
	} else if (dataProduct.length > 0) {
		const editProduct = dataProduct.find((product) => product._id === id);
		if (editProduct.sale == null) {
			editProduct.sale = "";
		}
		return (
			<>
				<Formik
					initialValues={{
						name: editProduct.name,
						cateId: editProduct.cateId,
						subCateId: editProduct.subCateId,
						price: editProduct.price,
						sale: editProduct.sale,
						guarantee: editProduct.guarantee,
						description: editProduct.description,
						status: editProduct.status,
					}}
					onSubmit={async (values) => {
						const formProduct = new FormData();
						formProduct.append("cateId", values.cateId);
						formProduct.append("subCateId", values.subCateId);
						formProduct.append("name", values.name);
						formProduct.append("price", values.price);
						formProduct.append("sale", values.sale);
						formProduct.append("guarantee", values.guarantee);
						formProduct.append("description", values.description);
						formProduct.append("status", values.status);
						if (values.photo) {
							formProduct.append("photo", values.photo);
						}

						updateProduct(id, formProduct);
						history.push("/admin/product");
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string().required(
							"Không được để trống tên sản phẩm"
						),
						cateId: Yup.string().required("Chưa chọn danh mục"),
						subCateId: Yup.string().required(
							"Chưa chọn thương hiệu"
						),
						price: Yup.number()
							.positive("Không được để giá trị âm")
							.required("Không được để trống giá sản phẩm"),
						sale: Yup.number()
							.positive("Không được để giá trị âm")
							.max(100),
						description: Yup.string().required("Chưa nhập mô tả"),
						status: Yup.string().required(
							"Vui lòng chọn trạng thái"
						),
					})}
				>
					{(props) => {
						return (
							<>
								<div className="row bg-white">
									<div className="col col-lg-12 pt-3">
										<div className="card-body">
											<h4 className="card-title">
												Sửa sản phẩm{" "}
												<mark>{editProduct.name}</mark>
											</h4>
										</div>
									</div>
								</div>
								<Form className="row bg-white fs-5">
									<div className="col-md-6">
										<div className="card-body">
											<SelectField
												label="Danh mục"
												name="cateId"
												options={LIST_CATEGORY()}
											/>

											<SelectField
												label="Thương hiệu"
												name="subCateId"
												options={LIST_SUBCATEGORY()}
											/>

											<InPutField
												label="Tên"
												type="text"
												name="name"
												placeholder="Tên"
												className="form-control fs-5"
											/>

											<InPutField
												label="Giá"
												type="number"
												name="price"
												placeholder="Giá"
												className="form-control fs-5"
											/>

											<InPutField
												label="Giá sale"
												type="number"
												name="sale"
												placeholder="Giá sale"
												className="form-control fs-5"
											/>

											<FastField
												component={FileField}
												type="file"
												name="photo"
												label="Ảnh"
												className="form-control fs-5"
											/>

											<img
												src={`http://localhost:4000/api/product/img/${editProduct._id}`}
												className="img-product"
												alt=""
											/>
										</div>
									</div>

									<div className="col-6">
										<div className="card-body">
											<SelectField
												label="Bảo hành"
												name="guarantee"
												options={GUARANTEE()}
											/>

											<div className="form-group mt-3">
												<label
													htmlFor=""
													className="block"
												>
													Mô tả chi tiết
												</label>
												<FastField
													component={TextareaField}
													name="description"
													value={
														editProduct.description
													}
												/>
											</div>

											<Field
												component={CheckboxField}
												label="Trạng thái"
												classLabel="form-check-label mb-0"
												type="checkbox"
												className="form-check-input"
												id="status"
												name="status"
											/>
										</div>
									</div>

									<div className="col col-lg-12">
										<div className="card-body text-end">
											<button className="btn btn-info fs-5">
												Sửa sản phẩm
											</button>
										</div>
									</div>
								</Form>
							</>
						);
					}}
				</Formik>
			</>
		);
	}

};

const mapStateToProps = (state) => {
	return {
		listProduct: state.products
	}
}



export default connect(mapStateToProps, {fetchProduct,
		updateProduct})(EditProduct);
